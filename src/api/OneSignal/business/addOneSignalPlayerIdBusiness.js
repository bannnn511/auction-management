import * as _ from 'lodash';
import { AppError } from '../../../utils/appError';
import { addOneSignalPlayerId, getOneSignalPlayerId } from '../database';

/**
 * Check if playerId is already in db.
 *
 * @param {string} playerId - OneSignal playerId
 * @param {string} userId - user Id
 * @return {Promise<boolean>}
 */
async function checkOneSignalId(playerId, userId) {
  if (playerId === (await getOneSignalPlayerId(userId))) {
    return false;
  }
  return true;
}

export async function addOneSignalPlayerIdBusiness(req) {
  const userId = _.get(req, 'currentUser.id');
  const { playerId } = req.body;
  if (!(await checkOneSignalId(playerId, userId))) {
    return 'OneSignal playerId already exists';
  }
  const data = await addOneSignalPlayerId({ userId, playerId });
  if (!data) {
    throw new AppError('Cannot add user onesignal playerId', 500, true);
  }
  return 'OneSignal playerId sent successfully';
}
