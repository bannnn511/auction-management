import { Buyers } from '../../../../models/index';

export function getUserIdNoPass(buyer) {
  try {
    const newBuyer = Buyers.findOne({
      attributes: ['id'],
      where: {
        email: buyer.email,
      },
    });
    return newBuyer;
  } catch (error) {
    console.log(error);
    return error;
  }
}
