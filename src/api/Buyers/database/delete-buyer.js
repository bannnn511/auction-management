import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function deleteBuyer(id, updatedBy) {
  await db.Buyers.update(
    { status: UserStatus.DELETED, updatedBy },
    {
      where: {
        id,
      },
    },
  );
  return db.Buyers.findOne({
    attribute: ['id', 'email', 'fullname', 'type', 'status'],
    where: {
      id,
    },
  });
}
