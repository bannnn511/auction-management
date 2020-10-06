import * as _ from 'lodash';
import { AppError } from '../../../utils/appError';
import { addOneSignalPlayerId } from '../database';

export async function addOneSignalPlayerIdBusiness(req) {
  const userId = _.get(req, 'currentUser.id');
  const { playerId } = req.body;
  const data = await addOneSignalPlayerId({ userId, playerId });
  if (!data) {
    throw new AppError('Cannot add user onesignal playerId', 500, true);
  }
  return data;
}
