import { deleteBuyer } from '../database';
import { AppError } from '../../../utils/appError';
import { responseError } from '../../../shared/helpers';

export async function deleteUserBusiness(req, res) {
  try {
    const updatedBy = req.currentUser.id;
    const { id } = req.params;
    const buyer = await deleteBuyer(id, updatedBy);
    if (!buyer) {
      throw new AppError('Cannot delete user', 204);
    }
    return buyer;
  } catch (error) {
    responseError(res, error);
  }
}
