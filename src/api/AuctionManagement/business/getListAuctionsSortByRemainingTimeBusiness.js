import { responseError } from '../../../shared/helpers';
import { getAuctionsSortByRemaingTime } from '../database';
import { AppError } from '../../../utils/appError';

export async function getListAuctionsSortByRemainTimeBusiness(req, res) {
  try {
    const { max } = req.query;
    const auctions = await getAuctionsSortByRemaingTime(max);
    if (!auctions) {
      throw new AppError('Cannot get list of Auctions sort by remaining time');
    }
    return auctions;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
