import { getAllAuctions } from './business/index';
import { AppError } from '../../utils/appError';
import { responseSuccess, responseError } from '../../shared/helpers';
import { serializeAllAuctions } from './auction.serialize';

export async function getListAuction(req, res) {
  try {
    const auctions = await getAllAuctions();
    console.log(auctions);
    if (!auctions) {
      throw new AppError('Cannot get Auction list', 204);
    }
    const auctionData = serializeAllAuctions(auctions);
    console.log(auctionData);
    responseSuccess(res, auctionData);
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
}
