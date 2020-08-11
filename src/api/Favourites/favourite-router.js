import { Router } from 'express';
import {
  validateBody,
  authentication,
  redisValidation,
} from '../../shared/middleware';
import { FavouriteProductSchema } from './favourite.schema';
import {
  createNewFavouriteProduct,
  getListFavouriteProducts,
} from './favourite.controller';

const favouriteRouter = Router();

favouriteRouter.post(
  '/',
  validateBody(FavouriteProductSchema),
  authentication,
  redisValidation,
  createNewFavouriteProduct,
);

favouriteRouter.get(
  '/',
  authentication,
  redisValidation,
  getListFavouriteProducts,
);

export { favouriteRouter };
