import { Buyers } from '../../../../models/index';

module.exports = {
  requestToBeSeller(email) {
    return Buyers.update(
      { isSeller: true },
      {
        where: {
          email: email,
        },
      }
    );
  },
};
