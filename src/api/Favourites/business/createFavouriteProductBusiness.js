import { createFavouriteProduct } from '../database';
import { responseError } from '../../../shared/helpers';

export async function createFavouriteProductBusiness(req, res) {
  try {
    const { body } = req;
    const product = createFavouriteProduct(body);
    return product;
  } catch (error) {
    responseError(res, error);
  }
}
