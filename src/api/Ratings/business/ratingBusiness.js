import { responseError } from '../../../shared/helpers';
import { AppError } from '../../../utils/appError';
import { serializeRating } from '../rating.serialize';
import {
  ratingUser,
  findUserAlreadyRate,
  updateUserPlusPoint,
  updateUserMinusPoint,
} from '../database';
import { getAuctionWithAuctionId } from '../../AuctionManagement/database';
import { serializeAuction } from '../../AuctionManagement/auction.serialize';

const _ = require('lodash');

export async function ratingPointForUserBusiness(req, res) {
  try {
    const raterUser = req.currentUser.id;
    const { auctionId, point, description } = req.body;
    const auction = await getAuctionWithAuctionId(auctionId);
    const auctionData = serializeAuction(auction);
    if (auctionData.endAt >= new Date(_.now())) {
      throw new AppError('Bidding time has not ended yet', 204);
    }

    // check user already rated or not
    const user = await findUserAlreadyRate(auctionData.id, raterUser);
    if (user) {
      throw new AppError('You can only rate 1 time', 204);
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

    const ratingData = serializeRating(data);

    // update user plus/minus point
    if (ratingData.point > 0) {
      await updateUserPlusPoint(ratingData.ratedId);
    } else {
      await updateUserMinusPoint(ratingData.ratedId);
    }
    return ratingData;
  } catch (error) {
    responseError(res, error);
  }
}
