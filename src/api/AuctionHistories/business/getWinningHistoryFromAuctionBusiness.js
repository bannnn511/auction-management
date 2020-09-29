import { getWinningHistoryFromAuctionWithAuctionId } from '../database';
import { AppError } from '../../../utils/appError';

export async function getWinningHistoryFromAuctionBusiness(req) {
  const { auctionId } = req.query;
  const history = await getWinningHistoryFromAuctionWithAuctionId(auctionId);
  if (!history) {
    throw new AppError('There is no history from this auction', 500, true);
  }
  return history;
}
