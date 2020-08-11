import { Router } from 'express';
import {
  validateBody,
  authentication,
  restrictedTo,
  redisValidation,
} from '../../shared/middleware';
import {
  createProductAuctionSchema,
  updateProductAuctionSchema,
} from './product.schema';
import {
  createNewProduct,
  getProducts,
  updateProductDetail,
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
  validateBody(createProductAuctionSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  createNewProduct,
);

/*
 * Update product price
 * New price must be higher than current price
 * Create auction history if update price succeed
 */
productsRouter.put(
  '/:id',
  validateBody(updateProductAuctionSchema),
  authentication,
  redisValidation,
  updateProductDetail,
);

export { productsRouter };
