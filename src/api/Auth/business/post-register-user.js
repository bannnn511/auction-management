import {
  UserType,
  UserStatus,
  UserIsSeller,
  Hash,
} from '../../../shared/helpers/constant';

const bcrypt = require('bcrypt');
const db = require('../../../../models');

export async function registerUser(buyer) {
  try {
    const hash = await bcrypt.hash(buyer.password, 10);
    console.log(hash);
    const data = await db.Buyers.create({
      email: buyer.email,
      password: Hash.SALT,
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
