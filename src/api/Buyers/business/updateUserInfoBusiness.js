import { serializeBuyers } from '../buyers.serialize';
import { getLoginUserById } from '../../Auth/database';
import { AppError } from '../../../utils/appError';
import { requestingUpdatedInfo } from '../database';
import { responseError } from '../../../shared/helpers';

export async function updateUserInfoBusiness(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    body.updatedBy = req.currentUser.id;
    const userInfo = await getLoginUserById(req.currentUser.id);
    if (!userInfo) {
      throw new AppError(
        `There is no user with current id: ${req.currentUser.id}`,
        204,
      );
    }
    if (id !== req.currentUser.id) {
      throw new AppError('Id not acceptable', 400);
    }
    const buyer = await requestingUpdatedInfo(body, serializeBuyers(userInfo));
    if (!buyer) {
      throw new AppError("Cannot update Buyer's info");
    }
    return buyer;
  } catch (error) {
    responseError(res, error);
  }
}
