import { Buyers } from '../../../../models/index';

export function getAllBuyers() {
  return Buyers.findAll({ where: { status: 'active' } });
}
