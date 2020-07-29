import {
  getListAuction,
  getListAuctionSortByBiddingCount,
  getListAuctionWithHighestPrice,
  getListBuyerInAuction,
} from './auction.controller';
import { authorization } from '../../shared/middleware';

const { Router } = require('express');

const auctionRouter = Router();

auctionRouter.get('/', getListAuction);
auctionRouter.get('/highestbiddingcount', getListAuctionSortByBiddingCount);
auctionRouter.get('/highestprice', getListAuctionWithHighestPrice);
auctionRouter.get('/list', authorization, getListBuyerInAuction);
export { auctionRouter };
