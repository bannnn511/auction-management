import { Buyers } from '../../../../models/index';

module.exports = {
  updateBuyerPassword(buyer) {
    return Buyers.update(
      { password: buyer.password },
      { where: { email: buyer.email } }
    );
  },
};
