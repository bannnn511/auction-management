import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function updateBuyerPassword(buyer) {
  try {
    await db.Buyers.update(
      { password: buyer.password },
      { where: { id: buyer.id } },
    );
    const newBuyer = await db.Buyers.findOne({
      attribute: ['id', 'email', 'fullName', 'type', 'status'],
      where: {
        id: buyer.id,
        status: UserStatus.ACTIVE,
      },
    });
    return newBuyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
