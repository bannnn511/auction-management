import { getAllProducts } from '../database';
import { responseError } from '../../../shared/helpers';
import AppError from '../../../utils/appError';

export async function getAllProductsBusiness(req, res) {
  try {
    const { page, pagesize } = req.query;
    const product = await getAllProducts(page, pagesize);
    if (!product) {
      throw new AppError('Cannot get Products', 50);
    }
    return product;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
