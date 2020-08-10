import { serializeBuyers } from '../buyers.serialize';
import { getLoginUserById } from '../../Auth/database';
import { AppError } from '../../../utils/appError';
import { updateAUserInfoByAdmin } from '../database';
import { responseError } from '../../../shared/helpers';

export async function updateUserInfoByAdminBusiness(req, res) {
  try {
    const { id } = req.params;
    req.body.updatedBy = req.currentUser.id;
    const body = serializeBuyers(req.body, false);
    const userInfo = await getLoginUserById(id);
    if (!userInfo) {
      throw new AppError(
        `There is no user with current id: ${req.currentUser.id}`,
        204,
      );
    }

    const buyer = await updateAUserInfoByAdmin(
      id,
      body,
      serializeBuyers(userInfo),
    );
    if (!buyer) {
      throw new AppError("Cannot update Buyer's info");
    }
    return buyer;
  } catch (error) {
    responseError(res, error);
  }
}
