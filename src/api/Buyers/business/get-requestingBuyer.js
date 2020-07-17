import { Buyers } from '../../../../models/index';

module.exports = {
  getRequestingBuyers(email) {
    return Buyers.findAll({ where: { isSeller: true } });
  },
};
