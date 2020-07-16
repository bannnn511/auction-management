import { Buyers } from '../../../../models/index';

module.exports = {
  getAllBuyers() {
    return Buyers.findAll({ where: { status: 'active' } });
  },
};
