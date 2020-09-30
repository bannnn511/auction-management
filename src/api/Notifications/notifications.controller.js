import { responseSuccess } from '../../shared/helpers';
import {
  createNotificationBusiness,
  getListNotificationsBusiness,
  markAllNotficationAsReadBusiness,
  markANotificationAsreadBusiness,
} from './business/index';
import {
  serializeAllNotifications,
  serializeNotification,
} from './notifications.serialize';

export async function getListNotifications(req, res, next) {
  try {
    const data = await getListNotificationsBusiness(req, next);
    responseSuccess(res, serializeAllNotifications(data));
  } catch (error) {
    next(error);
  }
}

export async function createNotification(req, res, next) {
  try {
    const data = await createNotificationBusiness(req, res);
    responseSuccess(res, serializeNotification(data));
  } catch (error) {
    next(error);
  }
}

export async function markAllNotificationAsRead(req, res, next) {
  try {
    const data = await markAllNotficationAsReadBusiness(req, res);
    responseSuccess(res, serializeAllNotifications(data));
  } catch (error) {
    next(error);
  }
}

export async function markANotficationAsRead(req, res, next) {
  try {
    const data = await markANotificationAsreadBusiness(req, res);
    responseSuccess(res, serializeAllNotifications(data));
  } catch (error) {
    next(error);
  }
}
