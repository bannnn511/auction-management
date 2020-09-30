import * as _ from 'lodash';
import { AppError } from '../../../utils/appError';
import { getListNotifications } from '../database';
import { markAllNotificationsAsRead } from '../database/put-mark-all-notifications-as-read';

/**
 * A request
 * @typedef {{currentUser: Object, createdAt: string}} Request
 *
 * A response
 * @typedef {[Notfications]} Response
 */

/**
 * Mark all notifications as read.
 *
 * @export
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @return {Response} - Response [Notficcations] back to controller.
 */
export async function markAllNotficationAsReadBusiness(req) {
  const userId = _.get(req, 'currentUser.id');
  const data = await markAllNotificationsAsRead(userId);
  if (!data) {
    throw new AppError(
      'Can not mark all notifications as read for this user',
      500,
      true,
    );
  }
  return getListNotifications(userId);
}
