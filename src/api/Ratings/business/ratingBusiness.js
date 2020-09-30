import { AppError } from '../../../utils/appError';
import {
  ratingUser,
  findUserAlreadyRate,
  updateUserPlusPoint,
  updateUserMinusPoint,
} from '../database';
import { getAuctionWithAuctionId } from '../../AuctionManagement/database';
import { serializeAuction } from '../../AuctionManagement/auction.serialize';

const _ = require('lodash');

export async function ratingPointForUserBusiness(req) {
  const raterUser = req.currentUser.id;
  const { auctionId, point, description } = req.body;
  const auction = await getAuctionWithAuctionId(auctionId);
  const auctionData = serializeAuction(auction);
  if (auctionData.endAt >= new Date(_.now())) {
    throw new AppError('Bidding time has not ended yet', 500, true);
  }

  // check user already rated or not
  const user = await findUserAlreadyRate(auctionData.id, raterUser);
  if (user) {
    throw new AppError('You can only rate 1 time', 500, true);
  }

  let data;
  // check raterUser is Seller or Buyer
  if (raterUser === auctionData.buyerId) {
    data = await ratingUser(
      auctionData.id,
      raterUser,
      auctionData.sellerId,
      point,
      description,
      raterUser,
      raterUser,
    );
  } else if (raterUser === auctionData.sellerId) {
    data = await ratingUser(
      auctionData.id,
      raterUser,
      auctionData.buyerId,
      point,
      description,
      raterUser,
      raterUser,
    );
  } else {
    throw new AppError('You are not allow to rate in this auction');
  }

  // const ratingData = serializeRating(data);

  // update user plus/minus point
  if (data.point > 0) {
    await updateUserPlusPoint(data.ratedId);
  } else {
    await updateUserMinusPoint(data.ratedId);
  }
  return data;
}
