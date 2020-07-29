import { ratingPointForUser } from './rating.controller';
import { authorization } from '../../shared/middleware';

const { Router } = require('express');

const ratingsRouter = Router();

ratingsRouter.post('/', authorization, ratingPointForUser);

export { ratingsRouter };
