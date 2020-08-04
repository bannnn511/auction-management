import { Router } from 'express';
import {
  getAllBuyers,
  createNewBuyer,
  deleteABuyer,
  updateABuyerPassword,
  updateBuyerInfo,
  getABuyerDetailWithId,
  updateUserInfoByAdmin,
} from './buyers.controller';

import {
  authentication,
  redisValidation,
  validateBody,
  restrictedTo,
} from '../../shared/middleware/index';
import {
  createBuyerOrSellerSchema,
  updateBuyerOrSellerSchema,
  changeBuyerOrSellerPasswordSchema,
  updateBuyerOrSellerSchemaByAdmin,
} from './buyer.schema';
import { UserType } from '../../shared/helpers/constant';

const buyersRouter = Router();

/*
 * Get list of user
 * buyers or sellers
 * sort with type and status
 */
buyersRouter.get('/', getAllBuyers);

/*
 * Get User detail with theirs ID
 */
buyersRouter.get('/:id', getABuyerDetailWithId);

/*
 * Create new User by Admin
 * as Buyer or Seller
 */
buyersRouter.post(
  '/',
  validateBody(createBuyerOrSellerSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  createNewBuyer,
);

/*
 * Update buyer info
 * Used for common user
 * change fullname
 * change address
 * request to be a seller
 */
buyersRouter.put(
  '/:id',
  validateBody(updateBuyerOrSellerSchema),
  redisValidation,
  authentication,
  updateBuyerInfo,
);

/*
 * Change User password
 */
buyersRouter.post(
  '/:id/password',
  validateBody(changeBuyerOrSellerPasswordSchema),
  redisValidation,
  authentication,
  updateABuyerPassword,
);

/*
 * Delete User by Admin
 */
buyersRouter.put(
  '/:id/delete',
  // validateBody(updateBuyerOrSellerSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  deleteABuyer,
);

/*
 * Update buyer info
 * Used for common user
 * change fullname
 * change address
 * request to be a seller
 * accept buyer request
 */
buyersRouter.put(
  '/:id/admin',
  validateBody(updateBuyerOrSellerSchemaByAdmin),
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  updateUserInfoByAdmin,
);

export { buyersRouter };
