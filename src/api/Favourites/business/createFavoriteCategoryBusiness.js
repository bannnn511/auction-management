import { AppError } from '../../../utils/appError';
import { getCategoryId } from '../../Categories/database/get-category-id';
import {
  checkIfUserDidLikeCategory,
  deleteUserDidLikeCategory,
} from '../database';
import { createFavoriteCategory } from '../database/create-favourite-category';

async function checkIfAlreadyLikeCategory(categoryId, userId) {
  try {
    const exist = await checkIfUserDidLikeCategory(categoryId, userId);
    if (exist) {
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
}

export async function createFavoriteCategoryBusiness(req) {
  const { category } = req.body;
  const userId = req.currentUser.id;
  const categoryId = await getCategoryId(category);
  if (!categoryId) {
    throw new AppError(`${category} category does not exist`, 500, true);
  }
  if (checkIfAlreadyLikeCategory) {
    const deleteFav = await deleteUserDidLikeCategory(categoryId, userId);
    if (deleteFav) {
      return 'Delete favorite category';
    }
  }
  return createFavoriteCategory(userId, categoryId);
}
