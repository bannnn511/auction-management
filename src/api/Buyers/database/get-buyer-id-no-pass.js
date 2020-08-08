import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getUserIdWithEmail(buyer) {
  try {
    const newBuyer = db.Buyers.findOne({
      attributes: ['id'],
      where: {
        email: buyer.email,
        status: UserStatus.ACTIVE,
      },
    });
    return newBuyer;
  } catch (error) {
    console.log(error);
    return error;
  }
}
