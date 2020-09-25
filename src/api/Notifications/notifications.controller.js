import { responseError, responseSuccess } from '../../shared/helpers';
import { createNotificationBusiness } from './business/createNotificationBusiness';
import { getListNotificationsBusiness } from './business/getListNotificationsBusiness';
import { updateNotificationToReadBusiness } from './business/updateNotificationToReadBusiness';
import {
  serializeAllNotifications,
  serializeNotification,
} from './notifications.serialize';

export async function getListNotifications(req, res) {
  try {
    const data = await getListNotificationsBusiness(req, res);
    responseSuccess(res, serializeAllNotifications(data));
  } catch (error) {
    responseError(res, error);
  }
}

export async function createNotification(req, res) {
  try {
    const data = await createNotificationBusiness(req, res);
    responseSuccess(res, serializeNotification(data));
  } catch (error) {
    responseError(res, error);
  }
}

export async function updateNotificationToRead(req, res) {
  try {
    const data = await updateNotificationToReadBusiness(req, res);
    responseSuccess(res, serializeNotification(data));
  } catch (error) {
    responseError(res, error);
  }
}
