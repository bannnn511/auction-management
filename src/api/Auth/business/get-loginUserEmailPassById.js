import { Buyers } from '../../../../models/index';

export function getLoginUserById(id) {
  return Buyers.findOne({
    attributes: ['id', 'email', 'type'],
    where: {
      id,
    },
  });
}
