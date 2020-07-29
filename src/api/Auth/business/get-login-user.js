import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getLoginUser(email, password) {
  try {
    const buyer = db.Buyers.findOne({
      attributes: ['email', 'password', 'type'],
      where: {
        email,
        password,
        status: UserStatus.ACTIVE,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}