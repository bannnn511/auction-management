import { responseSuccess } from '../../shared/helpers';
import { addOneSignalPlayerIdBusiness } from './business/addOneSignalPlayerIdBusiness';

export async function addOneSignalPlayerId(req, res, next) {
  try {
    const mss = await addOneSignalPlayerIdBusiness(req);
    responseSuccess(res, { mss });
  } catch (error) {
    next(error);
  }
}
