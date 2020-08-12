import { responseError } from '../../../shared/helpers';
import { getAuctionsSortByBiddingCount } from '../database';
import { AppError } from '../../../utils/appError';

export async function getListAuctionSortByBiddingCountBusiness(req, res) {
  try {
    const { max } = req.query;
    const auction = await getAuctionsSortByBiddingCount(max);
    if (!auction) {
      throw new AppError(
        'Cannot get list of Auctions sort by bidding count',
        204,
      );
    }
    return auction;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
