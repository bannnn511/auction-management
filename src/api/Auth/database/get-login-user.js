import { UserStatus } from '../../../shared/helpers/constant';

const bcrypt = require('bcrypt');
const db = require('../../../../models');

export async function getLoginUser(email, password) {
  const hash = await bcrypt.hash(password, 10);
  return db.Buyers.findOne({
    attributes: ['email', 'password', 'type'],
    where: {
      email,
      password: hash,
      status: UserStatus.ACTIVE,
    },
  });
}
