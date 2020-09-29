import { getAuctionSoldBySellerBusiness } from '../database';
import { AppError } from '../../../utils/appError';

export async function getAuctionSoldOnMarketOfASellerBusiness(req) {
  const { id } = req.currentUser;
  const { page, pagesize } = req.query;
  const data = await getAuctionSoldBySellerBusiness(page, pagesize, id);
  if (!data) {
    throw new AppError(
      'This seller is not selling anything on market',
      500,
      true,
    );
  }
  return data;
}
