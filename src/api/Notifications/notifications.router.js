import { Router } from 'express';
import { authentication, redisValidation } from '../../shared/middleware';

const notificationRouter = Router();

notificationRouter.get('/', authentication, redisValidation);

export { notificationRouter };
