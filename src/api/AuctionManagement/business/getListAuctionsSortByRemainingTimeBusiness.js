import { getAuctionsSortByRemaingTime } from '../database';
import { AppError } from '../../../utils/appError';

export async function getListAuctionsSortByRemainTimeBusiness(req) {
  const { max } = req.query;
  const auctions = await getAuctionsSortByRemaingTime(max);
  if (!auctions) {
    throw new AppError(
      'Cannot get list of Auctions sort by remaining time',
      500,
      true,
    );
  }
  return auctions;
}
