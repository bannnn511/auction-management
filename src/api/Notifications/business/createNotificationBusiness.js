import * as _ from 'lodash';
import { responseError } from '../../../shared/helpers';
import { AppError } from '../../../utils/appError';
import { createNotification } from '../database/post-create-notification';

export async function createNotificationBusiness(req, res) {
  try {
    const userId = _.get(req, 'currentUser.id');
    const { description } = req.body;
    const data = await createNotification({
      userId,
      description,
    });
    if (!data) {
      throw new AppError('Cannot create notification log');
    }
    return data;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
