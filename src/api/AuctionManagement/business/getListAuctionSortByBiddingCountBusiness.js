import { getAuctionsSortByBiddingCount } from '../database';
import { AppError } from '../../../utils/appError';

export async function getListAuctionSortByBiddingCountBusiness(req) {
  const { max } = req.query;
  const auction = await getAuctionsSortByBiddingCount(max);
  if (!auction) {
    throw new AppError(
      'Cannot get list of Auctions sort by bidding count',
      204,
    );
  }
  return auction;
}
