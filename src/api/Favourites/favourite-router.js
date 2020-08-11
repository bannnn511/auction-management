import { Router } from 'express';
import {
  validateBody,
  authentication,
  redisValidation,
} from '../../shared/middleware';
import { FavouriteProductSchema } from './favourite.schema';
import { createNewFavouriteProduct } from './favourite.controller';

const favouriteRouter = Router();

favouriteRouter.post(
  '/',
  validateBody(FavouriteProductSchema),
  authentication,
  redisValidation,
  createNewFavouriteProduct,
);

export { favouriteRouter };
