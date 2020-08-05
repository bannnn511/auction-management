import { UserStatus, Hash } from '../../../shared/helpers/constant';

const bcrypt = require('bcrypt');
const db = require('../../../../models');

export async function updateBuyerPassword(buyer) {
  try {
    const hash = await bcrypt.hash(buyer.password, Hash.SALT);
    console.log(hash);
    await db.Buyers.update(
      { password: hash, updatedBy: buyer.updatedBy },
      { where: { id: buyer.updatedBy } },
    );
    const newBuyer = await db.Buyers.findOne({
      where: {
        id: buyer.updatedBy,
        status: UserStatus.ACTIVE,
      },
    });
    return newBuyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
