import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getBuyerDetailWithId(id) {
  try {
    const newBuyer = db.Buyers.findOne({
      where: {
        id,
        status: UserStatus.ACTIVE,
      },
    });
    return newBuyer;
  } catch (error) {
    console.log(error);
    return error;
  }
}
