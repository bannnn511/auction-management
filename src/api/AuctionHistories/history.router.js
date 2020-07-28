import { getWinningHistoryFromAuction } from './history.controller';

const { Router } = require('express');

const historiesRouter = Router();
historiesRouter.get('/', getWinningHistoryFromAuction);

export { historiesRouter };
