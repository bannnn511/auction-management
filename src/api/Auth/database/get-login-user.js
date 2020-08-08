import { UserStatus } from '../../../shared/helpers/constant';

const bcrypt = require('bcrypt');
const db = require('../../../../models');

export async function getLoginUser(email, password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const buyer = db.Buyers.findOne({
      attributes: ['email', 'password', 'type'],
      where: {
        email,
        password: hash,
        status: UserStatus.ACTIVE,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
