import { Buyers } from '../../../../models/index';

export function acceptBuyerReq(email) {
  return Buyers.update(
    { type: 'seller' },
    {
      where: {
        email: email,
      },
    }
  );
}
