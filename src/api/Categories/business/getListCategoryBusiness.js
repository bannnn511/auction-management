import { getAllCategories } from '../database';
import AppError from '../../../utils/appError';

export async function getListCategoryBusiness(req) {
  const { page, pagesize } = req.query;
  const categories = await getAllCategories(page, pagesize);
  if (!categories) {
    throw new AppError('Cannot get category list', 500, true);
  }
  return categories;
}
