import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function getLoginUserById(id) {
  return db.Buyers.findOne({
    attributes: [
      'id',
      'email',
      'fullname',
      'address',
      'type',
      'status',
      'createdBy',
      'updatedBy',
    ],
    where: {
      id,
      status: UserStatus.ACTIVE,
    },
  });
}
