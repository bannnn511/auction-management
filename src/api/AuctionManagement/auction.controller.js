import {
  getAllAuctions,
  getAllBuyerInAuction,
  getAuctionsSortByBiddingCount,
  getAuctionsSortByRemaingTime,
  getAuctionsWithTopNProducts,
  getAuctionById,
} from './business/index';
import { AppError } from '../../utils/appError';
import { responseSuccess, responseError } from '../../shared/helpers';
import {
  serializeAllAuctions,
  serializeAllBuyerInAuction,
  serializeAuctionSortByBiddingCount,
  serializefullAction,
} from './auction.serialize';
import { getUserWinningAuction } from './business/get-user-winning-auction';

export async function getListAuction(req, res) {
  try {
    const { page, pagesize } = req.query;
    const auctions = await getAllAuctions(page, pagesize);
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

export async function getAnAuctionById(req, res) {
  try {
    const { id } = req.params;
    const auctions = await getAuctionById(id);
    if (!auctions) {
      throw new AppError('Cannot get Auction list', 204);
    }
    const auctionData = serializefullAction(auctions);
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
    const { max } = req.query;
    const auction = await getAuctionsSortByBiddingCount(max);
    if (!auction) {
      throw new AppError(
        'Cannot get list of Auctions sort by bidding count',
        204,
      );
    }
    const serializedAuction = serializeAuctionSortByBiddingCount(auction);
    console.log(serializedAuction);
    responseSuccess(res, serializedAuction);
  } catch (error) {
    responseError(res, error);
  }
}

// get list buyer in auction
export async function getListBuyerInAuction(req, res) {
  try {
    const { id } = req.params;
    const buyers = await getAllBuyerInAuction(id);
    if (!buyers) {
      throw new AppError('Cannot get list buyer', 204);
    }
    console.log(buyers);

    const data = serializeAllBuyerInAuction(buyers);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getListAuctionsSortByRemainingTime(req, res) {
  try {
    const { max } = req.query;
    const auctions = await getAuctionsSortByRemaingTime(max);
    if (!auctions) {
      throw new AppError('Cannot get list of Auctions sort by remaining time');
    }
    console.log(auctions);
    const serializedAuction = serializeAllAuctions(auctions);
    console.log(serializedAuction);
    responseSuccess(res, serializedAuction);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getAUserWinningAuction(req, res) {
  try {
    const data = await getUserWinningAuction(req.currentUser.id);
    if (!data) {
      throw new AppError('This Buyer has not won any auction', 204);
    }
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
