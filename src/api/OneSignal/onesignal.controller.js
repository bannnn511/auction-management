import { responseSuccess } from '../../shared/helpers';
import { addOneSignalPlayerIdBusiness } from './business/addOneSignalPlayerIdBusiness';

export async function addOneSignalPlayerId(req, res, next) {
  try {
    await addOneSignalPlayerIdBusiness(req);
    responseSuccess(res, { mss: 'OneSignal Player Id sent successfully' });
  } catch (error) {
    next(error);
  }
}
