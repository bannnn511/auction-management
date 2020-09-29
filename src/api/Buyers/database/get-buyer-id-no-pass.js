import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function getUserIdWithEmail(buyer) {
  return db.Buyers.findOne({
    attributes: ['id'],
    where: {
      email: buyer.email,
      status: UserStatus.ACTIVE,
    },
  });
}
