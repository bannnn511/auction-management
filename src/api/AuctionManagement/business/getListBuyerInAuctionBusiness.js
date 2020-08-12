import { responseError } from '../../../shared/helpers';
import { getAllBuyerInAuction } from '../database';
import { AppError } from '../../../utils/appError';

export async function getlistBuyerInAuctionBusiness(req, res) {
  try {
    const { id } = req.params;
    const buyers = await getAllBuyerInAuction(id);
    if (!buyers) {
      throw new AppError('Cannot get list buyer', 204);
    }
    return buyers;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
