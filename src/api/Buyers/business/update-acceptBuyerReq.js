import { Buyers } from '../../../../models/index';

module.exports = {
  acceptBuyerReq(email) {
    return Buyers.update(
      { type: 'seller' },
      {
        where: {
          email: email,
        },
      }
    );
  },
};
