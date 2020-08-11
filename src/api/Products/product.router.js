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
  updateProductPriceAuctionSchema,
} from './product.schema';
import {
  createNewProduct,
  getProducts,
  updateProductPrice,
  getProductsById,
  updateProductDetail,
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
 */
productsRouter.put(
  '/:id/price',
  validateBody(updateProductPriceAuctionSchema),
  authentication,
  redisValidation,
  updateProductPrice,
);

/*
 * Update product detail
 * Product name, description, endDate, imgurl
 */
productsRouter.put(
  '/:id',
  validateBody(updateProductAuctionSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  updateProductDetail,
);

export { productsRouter };
