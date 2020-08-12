import { createBuyer, getUserIdWithEmail } from '../database';
import { AppError } from '../../../utils/appError';
import { responseError } from '../../../shared/helpers';

export async function createNewUserByAdminBusiness(req, res) {
  try {
    const { body } = req;
    body.createdBy = req.currentUser.id;
    body.updatedBy = req.currentUser.id;
    const checkBuyerExist = await getUserIdWithEmail(body);
    if (checkBuyerExist) {
      throw new AppError('User already exists', 400);
    }
    const buyer = await createBuyer(body);
    if (!buyer) {
      throw new AppError('Cannot create user', 204);
    }
    return buyer;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
