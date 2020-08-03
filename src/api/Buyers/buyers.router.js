import { Router } from 'express';
import {
  getAllBuyers,
  createNewBuyer,
  deleteABuyer,
  requestToBeASeller,
  getAllRequestingBuyers,
  acceptABuyerReq,
  updateABuyerPassword,
  requestBackToBuyer,
  updateBuyerInfo,
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
} from './buyer.schema';
import { UserType } from '../../shared/helpers/constant';

const buyersRouter = Router();

buyersRouter.get('/:id', getAllBuyers);

buyersRouter.post(
  '/',
  validateBody(createBuyerOrSellerSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  createNewBuyer,
);

buyersRouter.put(
  '/:id/delete',
  validateBody(updateBuyerOrSellerSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  deleteABuyer,
);

buyersRouter.put(
  '/requestseller',
  validateBody(updateBuyerOrSellerSchema),
  redisValidation,
  authentication,
  requestToBeASeller,
);

buyersRouter.get(
  '/seller',
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  getAllRequestingBuyers,
);

buyersRouter.put(
  '/acceptseller',
  validateBody(updateBuyerOrSellerSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  acceptABuyerReq,
);

buyersRouter.put(
  '/password',
  validateBody(changeBuyerOrSellerPasswordSchema),
  redisValidation,
  authentication,
  updateABuyerPassword,
);

buyersRouter.put(
  '/backtobuyer',
  authentication,
  redisValidation,
  restrictedTo(UserType.ADMIN),
  requestBackToBuyer,
);

buyersRouter.put(
  '/updateinfo',
  validateBody(updateBuyerOrSellerSchema),
  authentication,
  redisValidation,
  updateBuyerInfo,
);

buyersRouter.put('/password', authentication, updateABuyerPassword);
export { buyersRouter };
