import { responseError } from '../../../shared/helpers';
import { AppError } from '../../../utils/appError';
import { getCategoryId } from '../../Categories/database/get-category-id';
import { createFavoriteCategory } from '../database/create-favourite-category';

export async function createFavoriteCategoryBusiness(req, res) {
  try {
    const { category } = req.body;
    const userId = req.currentUser.id;
    const categoryId = await getCategoryId(category);
    if (!categoryId) {
      throw new AppError(`${category} category does not exist`);
    }
    console.log(categoryId);
    const favoriteCategory = await createFavoriteCategory(userId, categoryId);
    return favoriteCategory;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
