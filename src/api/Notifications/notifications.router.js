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
  markANotficationAsRead,
} from './notifications.controller';
import { NotificationSchema } from './notifications.schema';

const notificationRouter = Router();

notificationRouter.get(
  '/',
  authentication,
  redisValidation,
  getListNotifications,
);

notificationRouter.post(
  '/',
  validateBody(NotificationSchema),
  authentication,
  redisValidation,
  createNotification,
);

notificationRouter.put(
  '/all',
  authentication,
  redisValidation,
  markAllNotificationAsRead,
);

notificationRouter.put(
  '/',
  validateBody(NotificationSchema),
  authentication,
  redisValidation,
  markANotficationAsRead,
);

export { notificationRouter };
