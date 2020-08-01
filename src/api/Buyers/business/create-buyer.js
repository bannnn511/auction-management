import { UserIsSeller } from '../../../shared/helpers/constant';

const bcrypt = require('bcrypt');
const db = require('../../../../models');

export async function createBuyer(buyer) {
  try {
    const hash = await bcrypt.hash(buyer.password, 10);
    console.log(hash);
    return await db.Buyers.create({
      email: buyer.email,
      password: buyer.password,
      type: buyer.type,
      status: buyer.status,
      address: buyer.address,
      fullname: buyer.fullname,
      isSeller: UserIsSeller.None,
      plusPoint: 1,
      minusPoint: 0,
      createdBy: buyer.createdBy,
      updatedBy: buyer.updatedBy,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
