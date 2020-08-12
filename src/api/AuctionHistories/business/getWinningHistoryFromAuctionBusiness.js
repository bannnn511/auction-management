import { responseError } from '../../../shared/helpers';
import { getWinningHistoryFromAuctionWithAuctionId } from '../database';
import { AppError } from '../../../utils/appError';

export async function getWinningHistoryFromAuctionBusiness(req, res) {
  try {
    const { auctionId } = req.query;
    const history = await getWinningHistoryFromAuctionWithAuctionId(auctionId);
    if (!history) {
      throw new AppError('There is no history from this auction', 204);
    }
    return history;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
