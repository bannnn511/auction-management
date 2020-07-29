import {
  responseError,
  responseSuccess,
  toDateString,
} from '../../shared/helpers';
import { AppError } from '../../utils/appError';
import { serializeRating } from './rating.serialize';
import { ratingUser } from './business';
import { getAuctionWithAuctionId } from '../AuctionManagement/business';
import { serializeAuction } from '../AuctionManagement/auction.serialize';

const _ = require('lodash');

export async function ratingPointForUser(req, res) {
  try {
    const raterUser = req.currentUser.id;
    req.body.createdBy = raterUser;
    req.body.updatedBy = raterUser;
    const auction = await getAuctionWithAuctionId(req.body.auctionId);
    const auctionData = serializeAuction(auction);
    console.log(
      toDateString(auctionData.endAt),
      '==========',
      toDateString(_.now()),
    );
    if (toDateString(auctionData.endAt) >= toDateString(_.now())) {
      throw new AppError('Bidding time has not ended yet', 204);
    }
    let data;
    if (raterUser === auctionData.buyerId) {
      data = await ratingUser(
        auctionData.id,
        raterUser,
        auctionData.sellerId,
        req.body.point,
        req.body.description,
      );
    } else if (raterUser === auction.sellerId) {
      data = await ratingUser(
        auctionData.id,
        raterUser,
        auctionData.buyerId,
        req.body.point,
        req.body.description,
      );
    } else {
      throw new AppError('You are not allow to rate in this auction');
    }
    const ratingData = serializeRating(data);
    responseSuccess(res, ratingData);
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}
