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
import {
  NotficationUpdateSchema,
  NotificationSchema,
} from './notifications.schema';

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
  validateBody(NotficationUpdateSchema),
  authentication,
  redisValidation,
  markANotficationAsRead,
);

export { notificationRouter };
