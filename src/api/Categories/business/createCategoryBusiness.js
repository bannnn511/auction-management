import { responseError } from '../../../shared/helpers';
import { createCategory } from '../database';

export async function createNewCategoryBusiness(req, res) {
  try {
    req.body.createdBy = req.currentUser.id;
    req.body.updatedBy = req.currentUser.id;
    const { body } = req.body;

    const category = await createCategory(body);
    return category;
  } catch (error) {
    responseError(res, error);
  }
}
