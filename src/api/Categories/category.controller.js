import {
  getListCategoryBusiness,
  createNewCategoryBusiness,
  updateCategoryBusiness,
} from './business/index';
import { responseSuccess, responseError } from '../../shared/helpers';
import {
  serializeAllCategories,
  serializeCategory,
} from './category.serialize';

// get list category
export async function getListCategory(req, res) {
  try {
    const categories = await getListCategoryBusiness(req, res);
    const data = serializeAllCategories(categories);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

// create new category
export async function createNewCategory(req, res) {
  try {
    const category = await createNewCategoryBusiness(req, res);
    const data = serializeCategory(category);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

//update category
export async function updateCategoryInfo(req, res) {
  try {
    const category = await updateCategoryBusiness(req, res);
    const data = serializeCategory(category);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
