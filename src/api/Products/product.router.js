import { Router } from 'express';
import {
  validateBody,
  authorization,
  restrictedTo,
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
  authorization,
  restrictedTo(UserType.SELLER),
  createNewProduct,
);

productsRouter.put(
  '/updateprice',
  validateBody(bidProductAuctionSchema),
  authorization,
  updateProductCurrentPrice,
);

productsRouter.get('/', getProducts);

export { productsRouter };
