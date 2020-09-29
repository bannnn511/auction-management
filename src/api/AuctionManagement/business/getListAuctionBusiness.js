import { getAllAuctions, getAuctionByProductName } from '../database';
import { AppError } from '../../../utils/appError';
import { isEmptyObject } from '../../../shared/helpers';

export async function getListAuctionBusiness(req) {
  const { page, pagesize, productname } = req.query;
  if (productname) {
    const auctions = await getAuctionByProductName(productname);
    if (!auctions) {
      throw new AppError('Cannot get Auction list', 500, true);
    }
    return auctions;
  }
  const auctions = await getAllAuctions(page, pagesize);
  if (!auctions || isEmptyObject(auctions)) {
    throw new AppError('Cannot get Auction list', 500, true);
  }
  return auctions;
}
