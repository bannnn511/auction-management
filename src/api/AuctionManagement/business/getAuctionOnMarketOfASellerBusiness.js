import { getAuctionOnMarketOfASeller } from '../database';
import { AppError } from '../../../utils/appError';

export async function getAuctonOnMarketOfASellerBusiness(req) {
  const { id } = req.currentUser;
  const { page, pagesize } = req.query;
  const data = await getAuctionOnMarketOfASeller(page, pagesize, id);
  if (!data) {
    throw new AppError(
      'This seller is not selling anything on market',
      500,
      true,
    );
  }
  return data;
}
