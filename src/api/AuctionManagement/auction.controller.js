import {
  getAllAuctions,
  getAllBuyerInAuction,
  getAuctionsSortByBiddingCount,
  getAuctionsWithTopNProducts,
} from './business/index';
import { AppError } from '../../utils/appError';
import { responseSuccess, responseError } from '../../shared/helpers';
import {
  serializeAllAuctions,
  serializeAllBuyerInAuction,
} from './auction.serialize';

export async function getListAuction(req, res) {
  try {
    const auctions = await getAllAuctions();
    if (!auctions) {
      throw new AppError('Cannot get Auction list', 204);
    }
    const auctionData = serializeAllAuctions(auctions);
    console.log(auctionData);
    responseSuccess(res, auctionData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getListAuctionWithHighestPrice(req, res) {
  try {
    const { max } = req.query;
    const auctions = await getAuctionsWithTopNProducts(max);
    if (!auctions) {
      throw new AppError('Cannot get Auction list', 204);
    }
    const auctionData = serializeAllAuctions(auctions);
    console.log(auctionData);
    responseSuccess(res, auctionData);
  } catch (error) {
    responseError(res, error);
  }
}
export async function getListAuctionSortByBiddingCount(req, res) {
  try {
    // const { max } = req.query;
    const auction = await getAuctionsSortByBiddingCount();
    responseSuccess(res, auction);
  } catch (error) {
    responseError(res, error);
  }
}

// get list buyer in auction
export async function getListBuyerInAuction(req, res) {
  try {
    const buyers = await getAllBuyerInAuction(req.query.id);
    if (!buyers) {
      throw new AppError('Cannot get list buyer', 204);
    }

    const data = serializeAllBuyerInAuction(buyers);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
