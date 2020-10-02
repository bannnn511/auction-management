import { AppError } from '../../../utils/appError';
import { getAuctionsByDescription } from '../database';

export async function getAuctionsByDescriptionBusiness(req) {
  const { description } = req.body;
  const data = await getAuctionsByDescription(description);
  if (!data) {
    throw new AppError('Cannot find auctions with this description');
  }
  return data;
}
