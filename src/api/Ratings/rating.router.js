import { ratingPointForUser } from './rating.controller';
import { authorization, validateBody } from '../../shared/middleware';
import { ratingSchema } from './rating.schema';

const { Router } = require('express');

const ratingsRouter = Router();

ratingsRouter.post(
  '/',
  authorization,
  validateBody(ratingSchema),
  ratingPointForUser,
);

export { ratingsRouter };
