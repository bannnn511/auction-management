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
  banUserFromAuction,
  getAuctionsByDescription,
} from './auction.controller';
import {
  authentication,
  redisValidation,
  restrictedTo,
  validateBody,
} from '../../shared/middleware';
import { UserType } from '../../shared/helpers/constant';
import {
  auctionDescriptionSchema,
  banUserFromAuctionSchema,
} from './auction.schema';

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
auctionRouter.get(
  '/description',
  validateBody(auctionDescriptionSchema),
  getAuctionsByDescription,
);

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
auctionRouter.post(
  '/:id/ban',
  validateBody(banUserFromAuctionSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  banUserFromAuction,
);

export { auctionRouter };
