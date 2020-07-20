import { Router } from 'express';
import {
  getAllBuyers,
  createNewBuyer,
  deleteABuyer,
  requestToBeASeller,
  getAllRequestingBuyers,
  acceptABuyerReq,
  updateABuyerPassword,
} from './buyers.controller';

import {
  authorization,
  restrictedTo,
  validateBody,
} from '../../shared/middleware/index';
import { createBuyerOrSellerSchema } from './buyer.schema';

const buyersRouter = Router();

buyersRouter.get('/', getAllBuyers);
buyersRouter.post(
  '/',
  validateBody(createBuyerOrSellerSchema),
  authorization,
  restrictedTo,
  createNewBuyer
);
buyersRouter.put('/delete', authorization, restrictedTo, deleteABuyer);
buyersRouter.put('/requestseller', authorization, requestToBeASeller);
buyersRouter.get('/seller', getAllRequestingBuyers);
buyersRouter.put('/acceptseller', acceptABuyerReq);
buyersRouter.put('/password', updateABuyerPassword);

export { buyersRouter };
