import { getAllProducts } from '../database';
import AppError from '../../../utils/appError';

export async function getAllProductsBusiness(req) {
  const { page, pagesize } = req.query;
  const product = await getAllProducts(page, pagesize);
  if (!product) {
    throw new AppError('Cannot get Products', 500, true);
  }
  return product;
}
