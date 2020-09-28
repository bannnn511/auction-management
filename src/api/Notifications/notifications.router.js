import { Router } from 'express';
import {
  authentication,
  redisValidation,
  validateBody,
} from '../../shared/middleware';
import {
  createNotification,
  getListNotifications,
  markAllNotificationAsRead,
} from './notifications.controller';
import { NotificationCreationSchema } from './notifications.schema';

const notificationRouter = Router();

notificationRouter.get(
  '/',
  authentication,
  redisValidation,
  getListNotifications,
);

notificationRouter.post(
  '/',
  validateBody(NotificationCreationSchema),
  authentication,
  redisValidation,
  createNotification,
);

notificationRouter.put(
  '/',
  authentication,
  redisValidation,
  markAllNotificationAsRead,
);

export { notificationRouter };
