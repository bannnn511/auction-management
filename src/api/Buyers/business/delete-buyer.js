import { Buyers } from '../../../../models/index';

module.exports = {
  deleteBuyer(email) {
    return Buyers.update(
      { status: 'deleted' },
      {
        where: {
          email: email,
        },
      }
    );
  },
};
