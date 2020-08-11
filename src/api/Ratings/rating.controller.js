import { responseError, responseSuccess } from '../../shared/helpers';
import { ratingPointForUserBusiness } from './business';
import { serializeAuction } from '../AuctionManagement/auction.serialize';

export async function ratingPointForUser(req, res) {
  try {
    const rate = await ratingPointForUserBusiness(req, res);
    const ratingData = serializeAuction(rate);
    responseSuccess(res, ratingData);
  } catch (error) {
    responseError(res, error);
  }
}
