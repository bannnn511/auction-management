import { getProductWithId } from '../database';
import AppError from '../../../utils/appError';

export async function getProductByIdBusiness(req) {
  const { id } = req.params;
  const product = await getProductWithId(id);
  if (!product) {
    throw new AppError('Cannot get product with this id', 500, true);
  }
  return product;
}
