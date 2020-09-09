import _ from 'lodash';
import { getProductWithId, updateProductPrice } from '../database';
import { getAuctionWithProductId } from '../../AuctionManagement/database';
import { AppError } from '../../../utils/appError';
import { serializeAuctionHistoryFromProductAndAuction } from '../../AuctionHistories/history.serialize';
import { createAuctionHistory } from '../../AuctionHistories/database';
import { responseError } from '../../../shared/helpers';
import { Email } from '../../../utils/email';
import { getUserBanStatusFromAuctions } from '../../AuctionParticipating/database';
import { UserBanStatus } from '../../../shared/helpers/constant';

import db from '../../../../models';

export async function updateProductCurrentPriceBusiness(req, res) {
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
      throw new AppError('Product does not exist', 204);
    }

    // check auction exist
    const auction = await getAuctionWithProductId(id);
    if (!auction) {
      throw new AppError('There is no auction with this product', 204);
    }

    // check ban status
    const status = await getUserBanStatusFromAuctions({
      auctionId: auction.id,
      userId: body.updatedBy,
    });
    if (status === UserBanStatus.BAN) {
      throw new AppError('You have been banned from this auction', 400);
    }

    if (checkProduct.currentPrice >= body.price) {
      throw new AppError(
        'Bidding price must be higher than current price',
        406,
      );
    }

    // check if bidding time is till valid
    if (auction.endAt <= new Date(_.now())) {
      throw new AppError('Bidding time has expired', 204);
    }

    /*
    transaction for update product price
    create auction history after update product price
    rollback if transaction failed
    */
    const newProduct = await updateProductPrice(body, transaction);
    if (!newProduct) {
      throw new AppError('Cannot create Auction History', 204);
    }
    const fullAuctionDetail = serializeAuctionHistoryFromProductAndAuction(
      newProduct,
      auction,
    );

    const history = await createAuctionHistory(fullAuctionDetail, transaction);
    if (!history) {
      throw new AppError('Cannot create Auction History', 204);
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
    responseError(res, error);
    return null;
  }
}
