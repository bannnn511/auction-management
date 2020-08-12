import { responseError, responseSuccess } from '../../shared/helpers';
import { ratingPointForUserBusiness } from './business';
import { serializeRating } from './rating.serialize';

export async function ratingPointForUser(req, res) {
  try {
    const rate = await ratingPointForUserBusiness(req, res);
    const ratingData = serializeRating(rate);
    responseSuccess(res, ratingData);
  } catch (error) {
    responseError(res, error);
  }
}
