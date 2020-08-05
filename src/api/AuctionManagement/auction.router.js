import {
  getListAuction,
  getListAuctionSortByBiddingCount,
  getListAuctionsSortByRemainingTime,
  getListAuctionWithHighestPrice,
  getListBuyerInAuction,
  getAnAuctionById,
  getAUserWinningAuction,
} from './auction.controller';
import { authentication, redisValidation } from '../../shared/middleware';

const { Router } = require('express');

const auctionRouter = Router();

auctionRouter.get('/', getListAuction);
auctionRouter.get('/history', getListBuyerInAuction);
auctionRouter.get('/highestbiddingcount', getListAuctionSortByBiddingCount);
auctionRouter.get('/highestprice', getListAuctionWithHighestPrice);
auctionRouter.get('/remainingtime', getListAuctionsSortByRemainingTime);
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
