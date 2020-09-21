import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function getUserIdWithEmail(buyer) {
  try {
    const newBuyer = await db.Buyers.findOne({
      attributes: ['id'],
      where: {
        email: buyer.email,
        status: UserStatus.ACTIVE,
      },
    });
    return newBuyer;
  } catch (error) {
    console.error(error);
    return null;
  }
}
