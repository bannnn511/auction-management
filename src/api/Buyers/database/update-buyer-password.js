import { Hash, UserStatus } from '../../../shared/helpers/constant';

const bcrypt = require('bcrypt');
const db = require('../../../../models');

export async function updateBuyerPassword(buyer) {
  try {
    const hash = await bcrypt.hash(buyer.password, Hash.SALT);
    await db.Buyers.update(
      { password: hash, updatedBy: buyer.updatedBy },
      { where: { id: buyer.updatedBy } },
    );
    return await db.Buyers.findOne({
      where: {
        id: buyer.updatedBy,
        status: UserStatus.ACTIVE,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
