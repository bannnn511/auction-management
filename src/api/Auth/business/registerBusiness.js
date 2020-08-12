import { getUserIdWithEmail } from '../../Buyers/database';
import { AppError } from '../../../utils/appError';
import { registerUser } from '../database';
import { responseError } from '../../../shared/helpers';

export async function registerBusiness(req, res) {
  try {
    const { body } = req;

    const checkUser = await getUserIdWithEmail(body);
    if (checkUser) {
      throw new AppError('User already exists', 204);
    }
    const buyer = await registerUser(body);
    if (!buyer) {
      throw new AppError('Create account fail', 400);
    }
    return buyer;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
