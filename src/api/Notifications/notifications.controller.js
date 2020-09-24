import { responseError, responseSuccess } from '../../shared/helpers';
import { getListNotificationsBusiness } from './business/getListNotificationsBusiness';

export async function getListNotifications(req, res) {
  try {
    const data = await getListNotificationsBusiness(req, res);
    responseSuccess(res, data);
  } catch (error) {
    responseError(res, error);
  }
}
