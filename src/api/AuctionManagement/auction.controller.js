import { responseSuccess } from '../../shared/helpers';
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
import { getAuctionsByDescriptionBusiness } from './business/getAuctionsByDescription';

export async function getListAuction(req, res, next) {
  try {
    const data = await getListAuctionBusiness(req, res);
    const auctionData = serializeAllAuctions(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    next(error);
  }
}

export async function getAnAuctionById(req, res, next) {
  try {
    const data = await getAuctionByIdBusiness(req, res);
    const auctionData = serializefullAction(data);
    console.log(auctionData);
    responseSuccess(res, auctionData);
  } catch (error) {
    next(error);
  }
}

export async function getListAuctionWithHighestPrice(req, res, next) {
  try {
    const data = await getListAuctionWithHighestPriceBusiness(req, res);
    const auctionData = serializeAllAuctions(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    next(error);
  }
}
export async function getListAuctionSortByBiddingCount(req, res, next) {
  try {
    const data = await getListAuctionSortByBiddingCountBusiness(req, res);
    const serializedData = serializeAuctionSortByBiddingCount(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

// get list buyer in auction
export async function getListBuyerInAuction(req, res, next) {
  try {
    const data = await getlistBuyerInAuctionBusiness(req, res);
    const serializedData = serializeAllBuyerInAuction(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

export async function getListAuctionsSortByRemainingTime(req, res, next) {
  try {
    const data = await getListAuctionsSortByRemainTimeBusiness(req, res);
    const serializedAuction = serializeAllAuctions(data);
    responseSuccess(res, serializedAuction);
  } catch (error) {
    next(error);
  }
}

export async function getAUserWinningAuction(req, res, next) {
  try {
    const data = await getAUserWinningAuctionBusiness(req, res);
    const serializedData = serializeAllAuctions(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

export async function getAuctionOnMarketOfASeller(req, res, next) {
  try {
    const data = await getAuctonOnMarketOfASellerBusiness(req, res);
    const serializedData = serializeAllAuctions(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

export async function getAuctionSoldOnMarketOfASeller(req, res, next) {
  try {
    const data = await getAuctionSoldOnMarketOfASellerBusiness(req, res);
    const serializedData = serializeAllAuctions(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

export async function banUserFromAuction(req, res, next) {
  try {
    const data = await banUserFromAuctionBusiness(req, res);
    const serializedData = serializeUser(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

export async function getAuctionsByDescription(req, res, next) {
  try {
    const data = await getAuctionsByDescriptionBusiness(req);
    responseSuccess(res, serializeAllAuctions(data));
  } catch (error) {
    next(error);
  }
}
