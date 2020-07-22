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
} from './buyers.controller';

import {
  authorization,
  validateBody,
  restrictedTo,
} from '../../shared/middleware/index';
import {
  createBuyerOrSellerSchema,
  updateBuyerOrSellerSchema,
  changeBuyerOrSellerPasswordSchema,
} from './buyer.schema';
import { UserType } from '../../shared/helpers/constant';
import { requestingUpdatedInfo } from './business';

const buyersRouter = Router();

buyersRouter.get('/', getAllBuyers);

buyersRouter.post(
  '/',
  validateBody(createBuyerOrSellerSchema),
  authorization,
  restrictedTo(UserType.ADMIN),
  createNewBuyer,
);

buyersRouter.put(
  '/delete',
  validateBody(updateBuyerOrSellerSchema),
  authorization,
  restrictedTo(UserType.ADMIN),
  deleteABuyer,
);

buyersRouter.put(
  '/requestseller',
  validateBody(updateBuyerOrSellerSchema),
  authorization,
  requestToBeASeller,
);

buyersRouter.get(
  '/seller',
  authorization,
  restrictedTo(UserType.ADMIN),
  getAllRequestingBuyers,
);

buyersRouter.put(
  '/acceptseller',
  validateBody(updateBuyerOrSellerSchema),
  authorization,
  restrictedTo(UserType.ADMIN),
  acceptABuyerReq,
);

buyersRouter.put(
  '/password',
  validateBody(changeBuyerOrSellerPasswordSchema),
  authorization,
  updateABuyerPassword,
);

buyersRouter.put(
  '/backtobuyer',
  authorization,
  restrictedTo(UserType.ADMIN),
  requestBackToBuyer,
);

buyersRouter.put(
  '/updateInfo',
  authorization,
  validateBody(updateBuyerOrSellerSchema),
  requestingUpdatedInfo,
);

buyersRouter.put('/password', authorization, updateABuyerPassword);
export { buyersRouter };
