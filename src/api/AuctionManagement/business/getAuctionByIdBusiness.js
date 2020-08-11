import { responseError } from '../../../shared/helpers';
import { getAuctionById } from '../database';
import { AppError } from '../../../utils/appError';

export async function getAuctionByIdBusiness(req, res) {
  try {
    const { id } = req.params;
    const auctions = await getAuctionById(id);
    if (!auctions) {
      throw new AppError('Cannot get Auction list', 204);
    }
    return auctions;
  } catch (error) {
    responseError(res, error);
  }
}
