import * as _ from 'lodash';
import { AppError } from '../../../utils/appError';
import { getListNotifications } from '../database/get-list-notifications';

export async function getListNotificationsBusiness(req) {
  const userId = _.get(req, 'currentUser.id');
  const data = await getListNotifications(userId);
  if (!data) {
    throw new AppError("Cannot get this user's notification", 500, true);
  }
  return data;
}
