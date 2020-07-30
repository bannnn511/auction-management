import { Router } from 'express';
import {
  validateBody,
  authentication,
  restrictedTo,
  redisValidation,
} from '../../shared/middleware';
import {
  productAuctionSchema,
  bidProductAuctionSchema,
} from './product.schema';
import {
  createNewProduct,
  getProducts,
  updateProductCurrentPrice,
} from './product.controller';
import { UserType } from '../../shared/helpers/constant';

const productsRouter = Router();

productsRouter.post(
  '/',
  validateBody(productAuctionSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  createNewProduct,
);

productsRouter.put(
  '/updateprice',
  validateBody(bidProductAuctionSchema),
  authentication,
  redisValidation,
  updateProductCurrentPrice,
);

productsRouter.get('/', getProducts);

export { productsRouter };
