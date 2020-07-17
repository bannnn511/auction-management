import { Buyers } from '../../../../models/index';

export function registerUser(buyer) {
  return Buyers.create({
    email: buyer.email,
    password: buyer.password,
    type: 'buyer',
    status: 'active',
    address: buyer.address,
    fullname: buyer.fullname,
    isSeller: false,
    plusPoint: 1,
    minusPoint: 0,
  });
}
