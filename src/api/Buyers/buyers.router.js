import { Router } from 'express';
import {
  getAllBuyers,
  createBuyer,
  deleteBuyer,
  requestToBeSeller,
  getRequestingBuyers,
  acceptBuyerReq,
  updateBuyerPassword,
} from './buyers.controller';

const buyersRouter = Router();

buyersRouter.get('/', getAllBuyers);
buyersRouter.post('/', createBuyer);
buyersRouter.put('/', deleteBuyer);
buyersRouter.put('/requestseller', requestToBeSeller);
buyersRouter.get('/seller', getRequestingBuyers);
buyersRouter.put('/acceptseller', acceptBuyerReq);
buyersRouter.put('/password', updateBuyerPassword);

module.exports = {
  buyersRouter,
};
