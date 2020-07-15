import { Router } from 'express';
import { getOverview, middlewareA } from './client-view.controller';

const clientViewRouter = Router();

clientViewRouter.get('/', middlewareA, getOverview);

export { clientViewRouter };
