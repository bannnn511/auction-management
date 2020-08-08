import { getBuyers, getBuyersWithOptions } from '../database';
import { AppError } from '../../../utils/appError';
import { responseError } from '../../../shared/helpers';

export async function getAllUserBusinness(req, res) {
  try {
    const { isseller, type, page, pagesize } = req.query;
    let data;
    if (isseller !== undefined || type !== undefined) {
      data = await getBuyersWithOptions(page, pagesize, isseller, type);
    } else {
      data = await getBuyers(page, pagesize);
    }
    if (!data) {
      throw new AppError('Cannot get Buyers', 400);
    }
    return data;
  } catch (error) {
    responseError(res, error);
    return null;
  }
}
