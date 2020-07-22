import { Buyers } from '../../../../models/index';
import { UserStatus } from '../../../shared/helpers/constant';

export function getLoginUser(email, password) {
  try {
    const buyer = Buyers.findOne({
      attributes: ['email', 'password', 'type'],
      where: {
        email,
        password,
        status: UserStatus.ACTIVE,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
