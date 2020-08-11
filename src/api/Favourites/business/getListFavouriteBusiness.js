import { getFavouriteProducts } from '../database';
import { responseError } from '../../../shared/helpers';
import AppError from '../../../utils/appError';

export async function getFavouriteProductsBusiness(req, res) {
  try {
    const { page, pagesize } = req.query;
    const products = await getFavouriteProducts(
      req.currentUser.id,
      page,
      pagesize,
    );
    if (!products) {
      throw new AppError('Cannot get Products', 50);
    }
    return products;
  } catch (error) {
    responseError(res, error);
  }
}
