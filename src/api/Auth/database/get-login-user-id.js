import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getLoginUserId(email, password) {
  return db.Buyers.findOne({
    where: {
      email,
      password,
      status: UserStatus.ACTIVE,
    },
  });
}
