import { getProductWithId } from '../database';
import { responseError } from '../../../shared/helpers';
import AppError from '../../../utils/appError';

export async function getProductByIdBusiness(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductWithId(id);
    if (!product) {
      throw new AppError('Cannot get product with this id', 400);
    }
    return product;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
