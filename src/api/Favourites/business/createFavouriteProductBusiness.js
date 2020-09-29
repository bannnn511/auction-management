import { createFavouriteProduct, getFavouriteProduct } from '../database';
import { AppError } from '../../../utils/appError';

export async function createFavouriteProductBusiness(req) {
  const { body } = req;
  const existedProduct = await getFavouriteProduct(body.productId);
  if (existedProduct) {
    throw new AppError(
      'This product is already in your favourite list',
      500,
      true,
    );
  }
  const product = await createFavouriteProduct(
    req.currentUser.id,
    body.productId,
  );
  return product;
}
