import { responseError, responseSuccess } from '../../shared/helpers';

import { serializeAuction } from '../AuctionManagement/auction.serialize';
import { ratingPointForUserBusiness } from './business';

export async function ratingPointForUser(req, res) {
  try {
    const rate = await ratingPointForUserBusiness(req, res);
    const ratingData = serializeAuction(rate);
    responseSuccess(res, ratingData);
  } catch (error) {
    responseError(res, error);
  }
}
