import { Buyers } from '../../../../models/index';

export function getLoginUserId(email, password) {
  return Buyers.findOne({
    attributes: ['id'],
    where: {
      email,
      password,
    },
  });
}
