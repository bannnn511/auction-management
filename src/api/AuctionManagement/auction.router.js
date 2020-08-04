import {
  getListAuction,
  getListAuctionSortByBiddingCount,
  getListAuctionsSortByRemainingTime,
  getListAuctionWithHighestPrice,
  getListBuyerInAuction,
  getAnAuctionById,
} from './auction.controller';
import { authentication, redisValidation } from '../../shared/middleware';

const { Router } = require('express');

const auctionRouter = Router();

auctionRouter.get('/', getListAuction);
auctionRouter.get('/:id', getAnAuctionById);
auctionRouter.get(
  '/history',
  authentication,
  redisValidation,
  getListBuyerInAuction,
);
auctionRouter.get('/highestbiddingcount', getListAuctionSortByBiddingCount);
auctionRouter.get('/highestprice', getListAuctionWithHighestPrice);
auctionRouter.get('/remainingtime', getListAuctionsSortByRemainingTime);
auctionRouter.get(
  '/list',
  authentication,
  redisValidation,
  getListBuyerInAuction,
);

export { auctionRouter };
