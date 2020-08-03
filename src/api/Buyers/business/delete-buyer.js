import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function deleteBuyer(id, updatedBy) {
  try {
    let buyer = await db.Buyers.update(
      { status: UserStatus.DELETED, updatedBy },
      {
        where: {
          id,
        },
      },
    );
    buyer = await db.Buyers.findOne({
      attribute: ['id', 'email', 'fullname', 'type', 'status'],
      where: {
        id,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
