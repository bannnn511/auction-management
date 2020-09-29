import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function getBuyerDetailWithId(id) {
  return db.Buyers.findOne({
    where: {
      id,
      status: UserStatus.ACTIVE,
    },
  });
}
