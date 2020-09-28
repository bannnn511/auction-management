import * as _ from 'lodash';
import { responseError } from '../../../shared/helpers';
import { AppError } from '../../../utils/appError';
import { markAllNotificationsAsRead } from '../database/put-mark-all-notifications-as-read';

export async function markAllNotficationAsReadBusiness(req, res) {
  try {
    const userId = _.get(req, 'currentUser.id');
    const data = await markAllNotificationsAsRead(userId);
    if (!data) {
      throw new AppError(
        'Can not mark all notifications as read for this user',
      );
    }
    return data;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
