import { UserType } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function requestingBackToBuyer(id, updatedBy) {
  try {
    await db.Buyers.update(
      { isSeller: false, updatedBy, type: UserType.BUYER },
      {
        where: {
          id,
        },
      },
    );
    const buyer = await db.Buyers.findOne({
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
