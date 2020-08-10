import { getBuyerDetailWithId } from '../database';
import { AppError } from '../../../utils/appError';
import { responseError } from '../../../shared/helpers';

export async function getUserDetailBusiness(req, res) {
  try {
    const { id } = req.params;
    const buyer = await getBuyerDetailWithId(id);
    if (!buyer) {
      throw new AppError(`Cannt get Buyer with id: ${id}`);
    }
    return buyer;
  } catch (error) {
    responseError(res, error);
  }
}
