import { Buyers } from '../../../../models/index';

module.exports = {
  createBuyer(buyer) {
    return Buyers.create({
      email: buyer.email,
      password: buyer.password,
      type: buyer.type,
      status: buyer.status,
      address: buyer.address,
      fullname: buyer.fullname,
      isSeller: false,
      plusPoint: buyer.plusPoint,
      minusPoint: buyer.minusPoint,
    });
  },
};