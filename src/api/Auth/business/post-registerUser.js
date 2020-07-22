import { Buyers } from '../../../../models/index';
import {
  UserType,
  UserStatus,
  UserIsSeller,
} from '../../../shared/helpers/constant';

export function registerUser(buyer) {
  try {
    const data = Buyers.create({
      email: buyer.email,
      password: buyer.password,
      type: UserType.BUYER,
      status: UserStatus.ACTIVE,
      address: buyer.address,
      fullname: buyer.fullname,
      isSeller: UserIsSeller.None,
      plusPoint: 1,
      minusPoint: 0,
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
