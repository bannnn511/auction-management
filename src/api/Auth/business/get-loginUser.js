import { Buyers } from '../../../../models/index';

export function getLoginUser(email, password) {
  try {
    const buyer = Buyers.findOne({
      attributes: ['email', 'password', 'type'],
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
