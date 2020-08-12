import { responseError } from '../../../shared/helpers';
import { getAuctionsWithTopNProducts } from '../database';
import { AppError } from '../../../utils/appError';

export async function getListAuctionWithHighestPriceBusiness(req, res) {
  try {
    const { max } = req.query;
    const auctions = await getAuctionsWithTopNProducts(max);
    if (!auctions) {
      throw new AppError('Cannot get Auction list', 204);
    }
    return auctions;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
