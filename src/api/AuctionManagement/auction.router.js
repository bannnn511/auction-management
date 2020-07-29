import { getListAuction, getListBuyerInAuction } from './auction.controller';
import { authorization } from '../../shared/middleware';

const { Router } = require('express');

const auctionRouter = Router();

auctionRouter.get('/', getListAuction);

auctionRouter.get('/', authorization, getListBuyerInAuction);
export { auctionRouter };
