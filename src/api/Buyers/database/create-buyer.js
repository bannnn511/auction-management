import { UserIsSeller } from '../../../shared/helpers/constant';

const bcrypt = require('bcrypt');
const db = require('../../../../models');

export async function createBuyer(buyer) {
  const hash = await bcrypt.hash(buyer.password, 10);
  return db.Buyers.create({
    email: buyer.email,
    password: hash,
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
}
