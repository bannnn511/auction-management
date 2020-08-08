import { Router } from 'express';
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserPassword,
  updateUserInfo,
  getUserDetailWithId,
  updateUserInfoByAdmin,
} from './buyers.controller';

import {
  authentication,
  redisValidation,
  validateBody,
  restrictedTo,
  validateQuery,
} from '../../shared/middleware/index';
import {
  createBuyerOrSellerSchema,
  updateBuyerOrSellerSchema,
  changeBuyerOrSellerPasswordSchema,
  updateBuyerOrSellerSchemaByAdmin,
} from './buyer.schema';
import { UserType } from '../../shared/helpers/constant';
import { paginationSchema } from '../../utils/pagination.schema';

const buyersRouter = Router();

/*
 * Get list of user
 * buyers or sellers
 * filter with type and status
 */
buyersRouter.get('/', validateQuery(paginationSchema), getAllUsers);

/*
 * Get User detail with theirs ID
 */
buyersRouter.get('/:id', getUserDetailWithId);

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
  createNewUser,
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
  updateUserInfo,
);

/*
 * Change User password
 */
buyersRouter.post(
  '/:id/password',
  validateBody(changeBuyerOrSellerPasswordSchema),
  redisValidation,
  authentication,
  updateUserPassword,
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
  deleteUser,
);

/*
 * Update buyer info
 * Used for admin
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
