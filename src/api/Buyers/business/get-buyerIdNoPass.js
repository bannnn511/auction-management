import { Buyers } from '../../../../models/index';

export function getUserIdNoPass(buyer) {
  return Buyers.findOne({
    attributes: ['id'],
    where: {
      email: buyer.email,
    },
  });
}
