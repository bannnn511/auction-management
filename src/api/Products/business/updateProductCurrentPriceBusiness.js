import _ from 'lodash';
import { getProductWithId, updateProductPrice } from '../database';
import { getAuctionWithProductId } from '../../AuctionManagement/database';
import { AppError } from '../../../utils/appError';
import { serializeAuctionHistoryFromProductAndAuction } from '../../AuctionHistories/history.serialize';
import { createAuctionHistory } from '../../AuctionHistories/database';
import { Email } from '../../../utils/email';
import { getUserBanStatusFromAuctions } from '../../AuctionParticipating/database';
import { UserBanStatus } from '../../../shared/helpers/constant';

import db from '../../../../models';

export async function updateProductCurrentPriceBusiness(req) {
  const io = req.app.get('socket');
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const { body } = req;
    body.updatedBy = req.currentUser.id;
    body.id = id;

    // check product exist
    const checkProduct = await getProductWithId(id);
    if (!checkProduct) {
      throw new AppError('Product does not exist', 500, true);
    }

    // check auction exist
    const auction = await getAuctionWithProductId(id);
    if (!auction) {
      throw new AppError('There is no auction with this product', 500, true);
    }

    // check ban status
    const status = await getUserBanStatusFromAuctions({
      auctionId: auction.id,
      userId: body.updatedBy,
    });
    if (status === UserBanStatus.BAN) {
      throw new AppError('You have been banned from this auction', 500, true);
    }

    if (checkProduct.currentPrice >= body.price) {
      throw new AppError(
        'Bidding price must be higher than current price',
        406,
      );
    }

    // check if bidding time is till valid
    if (auction.endAt <= new Date(_.now())) {
      throw new AppError('Bidding time has expired', 500, true);
    }

    /*
    transaction for update product price
    create auction history after update product price
    rollback if transaction failed
    */
    const newProduct = await updateProductPrice(body, transaction);
    if (!newProduct) {
      throw new AppError('Cannot create Auction History', 500, true);
    }
    const fullAuctionDetail = serializeAuctionHistoryFromProductAndAuction(
      newProduct,
      auction,
    );

    const history = await createAuctionHistory(fullAuctionDetail, transaction);
    if (!history) {
      throw new AppError('Cannot create Auction History', 500, true);
    }
    await transaction.commit();

    const returnData = await getProductWithId(newProduct.id);
    io.emit('broadcast', returnData);

    // send email after bidding
    const email = new Email(
      process.env.MY_EMAIL,
      req.currentUser.email,
      'Bidding Succeed',
      'You have bidded this auction successfully',
    );
    email.send();

    return returnData;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
