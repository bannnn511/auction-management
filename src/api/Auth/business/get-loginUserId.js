import { Buyers } from '../../../../models/index';
import { UserStatus } from '../../../shared/helpers/constant';

export function getLoginUserId(email, password) {
  try {
    const buyer = Buyers.findOne({
      attributes: ['id'],
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
