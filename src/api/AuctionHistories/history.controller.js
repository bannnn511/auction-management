import { responseSuccess } from '../../shared/helpers';
import { serializeAuctionHistory } from './history.serialize';
import { getWinningHistoryFromAuctionBusiness } from './business';

export async function getWinningHistoryFromAuction(req, res, next) {
  try {
    const history = await getWinningHistoryFromAuctionBusiness(req, res);
    const serializedHistory = serializeAuctionHistory(history);
    responseSuccess(res, serializedHistory);
  } catch (error) {
    next(error);
  }
}
