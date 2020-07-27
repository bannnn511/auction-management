import { getListCategory, createNewCategory } from './category.controller';
import { restrictedTo, authorization } from '../../shared/middleware';
import { UserType } from '../../shared/helpers/constant';

const { Router } = require('express');

const categoryRouter = Router();

categoryRouter.get(
  '/',
  authorization,
  restrictedTo(UserType.ADMIN),
  getListCategory,
);

categoryRouter.post(
  '/newcategory',
  authorization,
  restrictedTo(UserType.ADMIN),
  createNewCategory,
);
export { categoryRouter };
