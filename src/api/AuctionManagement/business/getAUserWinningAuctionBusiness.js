import { responseError } from '../../../shared/helpers';
import { getUserWinningAuction } from '../database/get-user-winning-auction';
import { AppError } from '../../../utils/appError';

export async function getAUserWinningAuctionBusiness(req, res) {
  try {
    const data = await getUserWinningAuction(req.currentUser.id);
    if (!data) {
      throw new AppError('This Buyer has not won any auction', 204);
    }
    return data;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
