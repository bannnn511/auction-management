import { getListCategory, createNewCategory } from './category.controller';
import { restrictedTo, authorization } from '../../shared/middleware';
import { UserType } from '../../shared/helpers/constant';

const { Router } = require('express');

const categoriesRouter = Router();

categoriesRouter.get(
  '/',
  authorization,
  restrictedTo(UserType.ADMIN),
  getListCategory,
);

categoriesRouter.post(
  '/newcategory',
  authorization,
  restrictedTo(UserType.ADMIN),
  createNewCategory,
);
export { categoriesRouter };
