import { Buyers } from '../../../../models/index';

export function getLoginUserId(email, password) {
  try {
    const buyer = Buyers.findOne({
      attributes: ['id'],
      where: {
        email,
        password,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
