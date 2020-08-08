import { serializeBuyers } from '../buyers.serialize';
import { createBuyer, getUserIdWithEmail } from '../database';
import { AppError } from '../../../utils/appError';
import { responseError } from '../../../shared/helpers';

export async function createNewUserByAdminBusiness(req, res) {
  try {
    req.body.createdBy = req.currentUser.id;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, true);
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
