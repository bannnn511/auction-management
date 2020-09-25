import * as _ from 'lodash';
import { AppError } from '../../../utils/appError';
import { updateNotificationToRead } from '../database/update-notification-to-read';

const { responseError } = require('../../../shared/helpers');

export async function updateNotificationToReadBusiness(req, res) {
  try {
    const userId = _.get(req, 'currentUser.id');
    const { description, createdAt } = req.body;
    const payload = {
      userId,
      description,
      createdAt,
    };
    const data = await updateNotificationToRead(payload);
    if (!data) {
      throw new AppError('Cannot update this notification');
    }
    return data;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
