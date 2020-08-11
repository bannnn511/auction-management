import {
  getListCategory,
  createNewCategory,
  updateCategoryInfo,
} from './category.controller';
import {
  restrictedTo,
  authentication,
  redisValidation,
} from '../../shared/middleware';
import { UserType } from '../../shared/helpers/constant';

const { Router } = require('express');

const categoriesRouter = Router();

categoriesRouter.get(
  '/',
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  getListCategory,
);

categoriesRouter.post(
  '/newcategory',
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  createNewCategory,
);

categoriesRouter.put(
  './:id',
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  updateCategoryInfo,
);
export { categoriesRouter };
