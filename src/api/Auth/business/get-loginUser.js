import { Buyers } from '../../../../models/index';

export function getLoginUser(email, password) {
  return Buyers.findOne({
    attributes: ['email', 'password'],
    where: {
      // [Op.and]: [{ email: email }, { password: pass }],
      email,
      password,
    },
  });
}
