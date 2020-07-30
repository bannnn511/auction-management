import { ratingPointForUser } from './rating.controller';
import {
  authentication,
  redisValidation,
  validateBody,
} from '../../shared/middleware';
import { ratingSchema } from './rating.schema';

const { Router } = require('express');

const ratingsRouter = Router();

ratingsRouter.post(
  '/',
  authentication,
  redisValidation,
  validateBody(ratingSchema),
  ratingPointForUser,
);

export { ratingsRouter };
