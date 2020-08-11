import { updateCategory, getCategory } from '../database';
import { responseError } from '../../../shared/helpers';
import { AppError } from '../../../utils/appError';

export async function updateCategoryBusiness(req, res) {
  try {
    const { body } = req;
    const { id } = req.params;
    const existedCategory = await getCategory(id);
    if (!existedCategory) {
      throw new AppError('This category is not existed', 400);
    }
    const category = await updateCategory(id, body.categoryName);
    return category;
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}
