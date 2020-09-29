import * as _ from 'lodash';
import { responseError } from '../../../shared/helpers';
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
export async function markANotificationAsreadBusiness(req, res) {
  try {
    const userId = _.get(req, 'currentUser.id');
    const { createdAt, description } = req.body;
    const data = await markANotificationAsRead({
      userId,
      createdAt,
      description,
    });
    if (!data) {
      throw new AppError('Cannot mark this notification as read for this user');
    }
    return data;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
