import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function getPassOfUser(email) {
  const buyer = await db.Buyers.findOne({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    attributes: ['password'],
  });
  return buyer.password;
}
