import { responseSuccess } from '../../shared/helpers';
import { ratingPointForUserBusiness } from './business';
import { serializeRating } from './rating.serialize';

export async function ratingPointForUser(req, res, next) {
  try {
    const rate = await ratingPointForUserBusiness(req);
    const ratingData = serializeRating(rate);
    responseSuccess(res, ratingData);
  } catch (error) {
    next(error);
  }
}
