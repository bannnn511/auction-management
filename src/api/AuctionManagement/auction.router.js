import {
  getListAuction,
  getListAuctionSortByBiddingCount,
  getListAuctionsSortByRemainingTime,
  getListAuctionWithHighestPrice,
  getListBuyerInAuction,
  getAnAuctionById,
  getAUserWinningAuction,
  getAuctionOnMarketOfASeller,
  getAuctionSoldOnMarketOfASeller,
} from './auction.controller';
import {
  authentication,
  redisValidation,
  restrictedTo,
} from '../../shared/middleware';
import { UserType } from '../../shared/helpers/constant';

const { Router } = require('express');

const auctionRouter = Router();

auctionRouter.get('/', getListAuction);
auctionRouter.get('/history', getListBuyerInAuction);
auctionRouter.get('/highestbiddingcount', getListAuctionSortByBiddingCount);
auctionRouter.get('/highestprice', getListAuctionWithHighestPrice);
auctionRouter.get('/remainingtime', getListAuctionsSortByRemainingTime);
auctionRouter.get(
  '/selling',
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  getAuctionOnMarketOfASeller,
);
auctionRouter.get(
  '/sold',
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  getAuctionSoldOnMarketOfASeller,
);
auctionRouter.get('/:id/buyers', getListBuyerInAuction);

/*
 * Get User winning auction products
 */
auctionRouter.get(
  '/bought-products',
  authentication,
  redisValidation,
  getAUserWinningAuction,
);
auctionRouter.get('/:id', getAnAuctionById);

export { auctionRouter };
