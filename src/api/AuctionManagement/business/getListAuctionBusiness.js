import { responseError } from '../../../shared/helpers';
import { getAllAuctions, getAuctionByProductName } from '../database';
import { AppError } from '../../../utils/appError';

export async function getListAuctionBusiness(req, res) {
  try {
    const { page, pagesize, productname } = req.query;
    if (productname) {
      const auctions = await getAuctionByProductName(productname);
      if (!auctions) {
        throw new AppError('Cannot get Auction list', 204);
      }
      return auctions;
    }
    const auctions = await getAllAuctions(page, pagesize);
    if (!auctions) {
      throw new AppError('Cannot get Auction list', 204);
    }
    return auctions;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
