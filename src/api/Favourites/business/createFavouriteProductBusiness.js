import { createFavouriteProduct, getFavouriteProduct } from '../database';
import { AppError } from '../../../utils/appError';
import { responseError } from '../../../shared/helpers';

export async function createFavouriteProductBusiness(req, res) {
  try {
    const { body } = req;
    const existedProduct = await getFavouriteProduct(body.productId);
    if (existedProduct) {
      throw new AppError('This product is already in your favourite list', 400);
    }
    const product = await createFavouriteProduct(
      req.currentUser.id,
      body.productId,
    );
    return product;
  } catch (error) {
    responseError(res, error);
  }
}
