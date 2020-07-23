import { UserIsSeller } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function createBuyer(buyer) {
  try {
    const newBuyer = db.Buyers.create({
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
    return newBuyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
