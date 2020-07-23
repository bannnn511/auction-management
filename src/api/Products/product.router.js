import { Router } from 'express';
import {
  validateBody,
  authorization,
  restrictedTo,
} from '../../shared/middleware';
import { productAuctionSchema } from './product.schema';
import { createNewProduct, getProducts } from './product.controller';
import { UserType } from '../../shared/helpers/constant';

const productsRouter = Router();

productsRouter.post(
  '/',
  validateBody(productAuctionSchema),
  authorization,
  restrictedTo(UserType.SELLER),
  createNewProduct,
);

productsRouter.get('/', getProducts);

export { productsRouter };
