import { getAllCategories } from '../database';
import { responseError } from '../../../shared/helpers';
import AppError from '../../../utils/appError';

export async function getListCategoryBusiness(req, res) {
  try {
    const { page, pagesize } = req.query;
    const categories = await getAllCategories(page, pagesize);
    if (!categories) {
      throw new AppError('Cannot get category list', 204);
    }
    return categories;
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}
