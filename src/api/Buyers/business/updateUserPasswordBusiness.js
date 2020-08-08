import { serializeBuyers } from '../buyers.serialize';
import { UserType } from '../../../shared/helpers/constant';
import { AppError } from '../../../utils/appError';
import { updateBuyerPassword } from '../database';
import { responseError } from '../../../shared/helpers';

export async function updateUserPasswordBusiness(req, res) {
  try {
    const { id } = req.params;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, true);

    // check if Id is the same
    if (req.currentUser.type !== UserType.ADMIN) {
      if (id !== req.currentUser.id) {
        throw new AppError('Request to change password denied', 406);
      }
    }
    const buyer = await updateBuyerPassword(body);
    if (!buyer) {
      throw new AppError("Update Buyer's password failed", 500);
    }
    return buyer;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
