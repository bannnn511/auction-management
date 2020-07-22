import { Buyers } from '../../../../models/index';
import { UserStatus } from '../../../shared/helpers/constant';

export function getUserIdNoPass(buyer) {
  try {
    const newBuyer = Buyers.findOne({
      attributes: ['id'],
      where: {
        email: buyer.email,
        status: UserStatus.ACTIVE,
      },
    });
    return newBuyer;
  } catch (error) {
    console.log(error);
    return error;
  }
}
