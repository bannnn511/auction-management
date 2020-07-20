import { Buyers } from '../../../../models/index';

export function getRequestingBuyers(email) {
  return Buyers.findAll({ where: { isSeller: true } });
}
