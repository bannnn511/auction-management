import { UserIsSeller, UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function requestingToBeSeller(id, updatedBy) {
  try {
    await db.Buyers.update(
      { isSeller: UserIsSeller.PENDING, updatedBy },
      {
        where: {
          id,
        },
      },
    );
    const buyer = await db.Buyers.findOne({
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
