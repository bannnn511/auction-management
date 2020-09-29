import {
  getListCategoryBusiness,
  createNewCategoryBusiness,
  updateCategoryBusiness,
} from './business/index';
import { responseSuccess } from '../../shared/helpers';
import {
  serializeAllCategories,
  serializeCategory,
} from './category.serialize';

// get list category
export async function getListCategory(req, res, next) {
  try {
    const categories = await getListCategoryBusiness(req, res);
    const data = serializeAllCategories(categories);
    responseSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

// create new category
export async function createNewCategory(req, res, next) {
  try {
    const category = await createNewCategoryBusiness(req, res);
    const data = serializeCategory(category);
    responseSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

// update category
export async function updateCategoryInfo(req, res, next) {
  try {
    const category = await updateCategoryBusiness(req, res);
    const data = serializeCategory(category);
    responseSuccess(res, data);
  } catch (error) {
    next(error);
  }
}
