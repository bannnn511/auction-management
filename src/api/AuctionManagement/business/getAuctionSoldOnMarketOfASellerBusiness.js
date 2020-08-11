import { responseError } from '../../../shared/helpers';
import { getAuctionSoldBySellerBusiness } from '../database';
import { AppError } from '../../../utils/appError';

export async function getAuctionSoldOnMarketOfASellerBusiness(req, res) {
  try {
    const { id } = req.currentUser;
    const { page, pagesize } = req.query;
    const data = await getAuctionSoldBySellerBusiness(page, pagesize, id);
    if (!data) {
      throw new AppError('This seller is not selling anything on market', 204);
    }
    return data;
  } catch (error) {
    responseError(res, error);
  }
}
