import { updateCategory, getCategory } from '../database';
import { responseError } from '../../../shared/helpers';
import { AppError } from '../../../utils/appError';

export async function updateCategoryBusiness(req, res) {
  try {
    const { params } = req.params;
    const { body } = req.body;
    const existedCategory = await getCategory(params);
    if (!existedCategory) {
      throw new AppError('This category is not existed', 400);
    }
    const category = await updateCategory(params, body.categoryName);
    return category;
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}
