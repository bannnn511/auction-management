import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getPassOfUser(email) {
  try {
    const buyer = db.Buyers.findOne({
      where: {
        email,
        status: UserStatus.ACTIVE,
      },
      attributes: ['password'],
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
