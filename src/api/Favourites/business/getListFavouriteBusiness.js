import {
  getFavouriteCategoryWithUserId,
  getFavouriteProducts,
} from '../database';
import { responseError } from '../../../shared/helpers';
import AppError from '../../../utils/appError';
import { userFavoriteType } from '../../../shared/helpers/constant';

export async function getFavouriteProductsBusiness(req, res) {
  try {
    const { page, pagesize, type } = req.query;
    if (type === userFavoriteType.CATEGORY) {
      const data = await getFavouriteCategoryWithUserId(req.currentUser.id);
      if (!data) {
        throw new AppError('Cannot get user favourite categoires');
      }
      return data;
    }
    const favourites = await getFavouriteProducts(
      req.currentUser.id,
      page,
      pagesize,
    );
    if (!favourites) {
      throw new AppError('Cannot get Products', 50);
    }
    return favourites;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
