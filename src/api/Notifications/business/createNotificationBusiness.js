import * as _ from 'lodash';
import { AppError } from '../../../utils/appError';
import { createNotification } from '../database/post-create-notification';

export async function createNotificationBusiness(req) {
  const userId = _.get(req, 'currentUser.id');
  const { description } = req.body;
  const data = await createNotification({
    userId,
    description,
  });
  if (!data) {
    throw new AppError('Cannot create notification log', 500, true);
  }
  return data;
}
