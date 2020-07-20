import { Buyers } from '../../../../models/index';

export function createBuyer(buyer) {
  return Buyers.create({
    email: buyer.email,
    password: buyer.password,
    type: buyer.type,
    status: buyer.status,
    address: buyer.address,
    fullname: buyer.fullname,
    isSeller: false,
    plusPoint: 1,
    minusPoint: 0,
    createdBy: buyer.createdBy,
    updatedBy: buyer.updatedBy,
  });
}
