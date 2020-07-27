import { getAllCategories, createCategory } from './business/index';
import { AppError } from '../../utils/appError';
import { responseSuccess, responseError } from '../../shared/helpers';
import {
  serializeAllCategories,
  serializeCategory,
} from './category.serialize';

// get list category
export async function getListCategory(req, res) {
  try {
    const categories = await getAllCategories();
    if (!categories) {
      throw new AppError('Cannot get category list', 204);
    }
    const data = serializeAllCategories(categories);
    console.log(data);
    responseSuccess(res, data);
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}

// create new category
export async function createNewCategory(req, res) {
  try {
    req.body.createdBy = req.currentUser.id;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeCategory(req.body);
    console.log(body);

    const category = await createCategory(body);
    const data = serializeCategory(category);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
