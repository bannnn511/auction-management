import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function getBuyerDetailWithId(id) {
  try {
    return await db.Buyers.findOne({
      where: {
        id,
        status: UserStatus.ACTIVE,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
