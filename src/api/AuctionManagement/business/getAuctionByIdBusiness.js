import { getAuctionById } from '../database';
import { AppError } from '../../../utils/appError';

export async function getAuctionByIdBusiness(req) {
  const { id } = req.params;
  const auctions = await getAuctionById(id);
  if (!auctions) {
    throw new AppError('Cannot get Auction list', 500, true);
  }
  return auctions;
}
