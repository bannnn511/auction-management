import {
  getFavouriteCategoryWithUserId,
  getFavouriteProducts,
} from '../database';
import AppError from '../../../utils/appError';
import { userFavoriteType } from '../../../shared/helpers/constant';

export async function getFavouriteProductsBusiness(req) {
  const { page, pagesize, type } = req.query;
  if (type === userFavoriteType.CATEGORY) {
    const data = await getFavouriteCategoryWithUserId(req.currentUser.id);
    if (!data) {
      throw new AppError('Cannot get user favourite categoires', 500, true);
    }
    return data;
  }
  const favourites = await getFavouriteProducts(
    req.currentUser.id,
    page,
    pagesize,
  );
  if (!favourites) {
    throw new AppError('Cannot get Products', 500, true);
  }
  return favourites;
}
