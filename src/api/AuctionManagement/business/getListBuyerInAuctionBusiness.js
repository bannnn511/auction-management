import { getAllBuyerInAuction } from '../database';
import { AppError } from '../../../utils/appError';

export async function getlistBuyerInAuctionBusiness(req) {
  const { id } = req.params;
  const buyers = await getAllBuyerInAuction(id);
  if (!buyers) {
    throw new AppError('Cannot get list buyer', 204);
  }
  return buyers;
}
