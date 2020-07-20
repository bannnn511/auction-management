import { Buyers } from '../../../../models/index';

export function updateBuyerPassword(buyer) {
  return Buyers.update(
    { password: buyer.password },
    { where: { email: buyer.email } }
  );
}
