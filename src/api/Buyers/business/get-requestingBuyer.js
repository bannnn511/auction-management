import { Buyers } from '../../../../models/index';

module.exports = {
  getRequestingBuyers(email) {
    return Buyers.find({ where: { isSeller: true } });
  },
};
