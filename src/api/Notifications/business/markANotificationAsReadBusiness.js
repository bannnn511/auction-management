import * as _ from 'lodash';
import { AppError } from '../../../utils/appError';
import { markANotificationAsRead } from '../database/index';

/**
 * A request
 * @typedef {{currentUser: Object, createdAt: string}} Request
 *
 * A response
 * @typedef {[Notfications]} Response
 */

/**
 * Mark a notification as read.
 *
 * @export
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @return {Response} - Response [Notfications] back to controller.
 */
export async function markANotificationAsreadBusiness(req) {
  const userId = _.get(req, 'currentUser.id');
  const { createdAt, description } = req.body;
  const sqlDate = new Date(createdAt);
  sqlDate.toISOString().slice(0, 19).replace('T', ' ');
  console.log(sqlDate);
  const data = await markANotificationAsRead({
    userId,
    createdAt: sqlDate,
    description,
  });
  if (!data) {
    throw new AppError(
      'Cannot mark this notification as read for this user',
      500,
      true,
    );
  }
  return data;
}
