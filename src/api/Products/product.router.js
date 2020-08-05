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
  getProductsById,
} from './product.controller';
import { UserType } from '../../shared/helpers/constant';

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProductsById);

/*
 * Create new Product
 * Also create Auction for this product
 * Used for seller only
 */
productsRouter.post(
  '/',
  validateBody(productAuctionSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  createNewProduct,
);

productsRouter.put(
  '/:id',
  validateBody(bidProductAuctionSchema),
  authentication,
  redisValidation,
  updateProductCurrentPrice,
);

export { productsRouter };
