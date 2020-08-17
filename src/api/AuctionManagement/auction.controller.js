import { responseSuccess, responseError } from '../../shared/helpers';
import {
  serializeAllAuctions,
  serializeAllBuyerInAuction,
  serializeAuctionSortByBiddingCount,
  serializefullAction,
} from './auction.serialize';
import { serializeUser } from '../Auth/auth.serialize';
import {
  getAuctionByIdBusiness,
  getAUserWinningAuctionBusiness,
  getListAuctionBusiness,
  getListAuctionSortByBiddingCountBusiness,
  getListAuctionsSortByRemainTimeBusiness,
  getListAuctionWithHighestPriceBusiness,
  getAuctonOnMarketOfASellerBusiness,
  getlistBuyerInAuctionBusiness,
  getAuctionSoldOnMarketOfASellerBusiness,
  banUserFromAuctionBusiness,
} from './business';

export async function getListAuction(req, res) {
  try {
    const data = await getListAuctionBusiness(req, res);
    const auctionData = serializeAllAuctions(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getAnAuctionById(req, res) {
  try {
    const data = await getAuctionByIdBusiness(req, res);
    const auctionData = serializefullAction(data);
    console.log(auctionData);
    responseSuccess(res, auctionData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getListAuctionWithHighestPrice(req, res) {
  try {
    const data = await getListAuctionWithHighestPriceBusiness(req, res);
    const auctionData = serializeAllAuctions(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    responseError(res, error);
  }
}
export async function getListAuctionSortByBiddingCount(req, res) {
  try {
    const data = await getListAuctionSortByBiddingCountBusiness(req, res);
    const serializedData = serializeAuctionSortByBiddingCount(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}

// get list buyer in auction
export async function getListBuyerInAuction(req, res) {
  try {
    const data = await getlistBuyerInAuctionBusiness(req, res);
    const serializedData = serializeAllBuyerInAuction(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getListAuctionsSortByRemainingTime(req, res) {
  try {
    const data = await getListAuctionsSortByRemainTimeBusiness(req, res);
    const serializedAuction = serializeAllAuctions(data);
    responseSuccess(res, serializedAuction);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getAUserWinningAuction(req, res) {
  try {
    const data = await getAUserWinningAuctionBusiness(req, res);
    const serializedData = serializeAllAuctions(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getAuctionOnMarketOfASeller(req, res) {
  try {
    const data = await getAuctonOnMarketOfASellerBusiness(req, res);
    const serializedData = serializeAllAuctions(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function getAuctionSoldOnMarketOfASeller(req, res) {
  try {
    const data = await getAuctionSoldOnMarketOfASellerBusiness(req, res);
    const serializedData = serializeAllAuctions(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}

export async function banUserFromAuction(req, res) {
  try {
    const data = await banUserFromAuctionBusiness(req, res);
    const serializedData = serializeUser(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    responseError(res, error);
  }
}
