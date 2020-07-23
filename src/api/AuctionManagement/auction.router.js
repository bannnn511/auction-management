import { getListAuction } from './auction.controller';

const { Router } = require('express');

const auctionRouter = Router();

auctionRouter.get('/', getListAuction);
export { auctionRouter };
