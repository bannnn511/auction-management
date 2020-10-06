import { Router } from 'express';
import {
  authentication,
  redisValidation,
  validateBody,
} from '../../shared/middleware';
import { addOneSignalPlayerId } from './onesignal.controller';
import { OneSignalSchema } from './onesignal.schema';

const onesignalRouter = Router();

onesignalRouter.post(
  '/',
  validateBody(OneSignalSchema),
  authentication,
  redisValidation,
  addOneSignalPlayerId,
);

export { onesignalRouter };
