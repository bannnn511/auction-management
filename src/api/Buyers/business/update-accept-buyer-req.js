import { UserType, UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function acceptBuyerReq(id, updatedBy) {
  try {
    let buyer = db.Buyers.update(
      { type: UserType.SELLER, updatedBy },
      {
        where: {
          id,
        },
      },
    );

    buyer = await db.Buyers.findOne({
      attribute: ['id', 'email', 'fullName', 'type', 'status'],
      where: {
        id,
        status: UserStatus.ACTIVE,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
