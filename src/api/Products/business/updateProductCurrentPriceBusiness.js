import _ from 'lodash';
import { getProductWithId, updateProductPrice } from '../database';
import { getAuctionWithProductId } from '../../AuctionManagement/database';
import { AppError } from '../../../utils/appError';
import { serializeAuctionHistoryFromProductAndAuction } from '../../AuctionHistories/history.serialize';
import { createAuctionHistory } from '../../AuctionHistories/database';
import { Email } from '../../../utils/email';
import {
  checkUserParticipateAuction,
  getUserBanStatusFromAuctions,
  userParticipateAuctions,
} from '../../AuctionParticipating/database';
import { UserBanStatus } from '../../../shared/helpers/constant';

import db from '../../../../models';

/**
 * Send email.
 *
 * @param {string} userEmail - users email
 */
function sendEmailAfterBidSuccessfully(userEmail) {
  const email = new Email(
    process.env.MY_EMAIL,
    userEmail,
    'Bidding Succeed',
    'You have bidded this auction successfully',
  );
  email.send();
}

/**
 * Request body
 * @typedef {Object} Body
 * @property {string} id - Product id
 * @property {string} price - Bidding price from request
 * @property {string} updatedBy - Buyer Id from client
 */

/**
 * Check bidding requirements.
 * Check product exists.
 * Check auction exists.
 * Check user ban status.
 * Check bidding price if it is higher than current price.
 * Check if auction ended.
 *
 * @param {string} id - product Id
 * @param {Body} body - data from request
 * @return {Object} - auction data
 */
async function checkBiddingCondition(body) {
  // check products exist
  const checkProduct = await getProductWithId(body.id);
  if (!checkProduct) {
    return new AppError('Product does not exist', 500, true);
  }

  // check auction exist
  const auction = await getAuctionWithProductId(body.id);
  if (!auction) {
    return new AppError('There is no auction with this product', 500, true);
  }

  // check ban status
  const status = await getUserBanStatusFromAuctions({
    auctionId: auction.id,
    userId: body.updatedBy,
  });
  if (status === UserBanStatus.BAN) {
    return new AppError('You have been banned from this auction', 500, true);
  }

  // check price valid
  if (checkProduct.currentPrice >= body.price) {
    return new AppError(
      'Bidding price must be higher than current price',
      500,
      true,
    );
  }

  // check if bidding time is till valid
  if (auction.endAt <= new Date(_.now())) {
    return new AppError('Bidding time has expired', 500, true);
  }

  return auction;
}

/**
 * Create new data in AuctionParticipate table.
 *
 * @param {*} data
 */
async function addUserParticipateAuction(data) {
  if (
    UserBanStatus.ACTIVE !== (await checkUserParticipateAuction(data).status)
  ) {
    const participate = await userParticipateAuctions(data);
    if (!participate) {
      throw new AppError('Cannot add user paraticipate auction', 500, true);
    }
  }
}

/**
 * Update product price.
 * Create bidding history.
 * Send email.
 * Add user participated.
 * Need transaction for atomicty.
 * Socket emit event for real-time update.
 *
 * @export
 * @param {Object} req - data request from clients
 * @return {Object} - updated product data
 */
export async function updateProductCurrentPriceBusiness(req) {
  const io = req.app.get('socket');
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const { body } = req;
    body.updatedBy = req.currentUser.id;
    body.id = id;

    const auction = checkBiddingCondition(body);
    if (auction instanceof Error) {
      throw auction;
    }

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

    // check if user had particpate auction if not create.
    addUserParticipateAuction(fullAuctionDetail);
    await transaction.commit();
    const returnData = await getProductWithId(newProduct.id);

    // emit event for real time data
    io.emit('broadcast', returnData);

    // send email after transaction commit succeed
    sendEmailAfterBidSuccessfully(req.currentUser.email);
    return returnData;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
