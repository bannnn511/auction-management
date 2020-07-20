import { Buyers } from '../../../../models/index';

export function getLoginUser(email, password) {
  return Buyers.findOne({
    attributes: ['email', 'password', 'type'],
    where: {
      email,
      password,
    },
  });
}
