import { Router } from 'express';
import {
  validateBody,
  authentication,
  redisValidation,
} from '../../shared/middleware';
import {
  FavoriteCategorySchema,
  FavouriteProductSchema,
} from './favourite.schema';
import {
  createNewFavoriteCategory,
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

favouriteRouter.post(
  '/category',
  validateBody(FavoriteCategorySchema),
  authentication,
  redisValidation,
  createNewFavoriteCategory,
);

favouriteRouter.get(
  '/',
  authentication,
  redisValidation,
  getListFavouriteProducts,
);

export { favouriteRouter };
