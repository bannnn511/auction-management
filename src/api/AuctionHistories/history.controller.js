import { responseError, responseSuccess } from '../../shared/helpers';
import { AppError } from '../../utils/appError';
import { serializeAuctionHistory } from './history.serialize';
import { getWinningHistoryFromAuctionWithAuctionId } from './business';

export async function getWinningHistoryFromAuction(req, res) {
  try {
    const { auctionId } = req.query;
    console.log(req.query);
    const history = await getWinningHistoryFromAuctionWithAuctionId(auctionId);
    if (!history) {
      throw new AppError('There is no history from this auction', 204);
    }
    const serializedHistory = serializeAuctionHistory(history.dataValues);
    console.log(serializedHistory);
    responseSuccess(res, serializedHistory);
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}
