import { getUserWinningAuction } from '../database/get-user-winning-auction';
import { AppError } from '../../../utils/appError';

export async function getAUserWinningAuctionBusiness(req) {
  const data = await getUserWinningAuction(req.currentUser.id);
  if (!data) {
    throw new AppError('This Buyer has not won any auction', 500, true);
  }
  return data;
}
