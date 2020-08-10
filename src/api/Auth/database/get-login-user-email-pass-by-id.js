import { UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getLoginUserById(id) {
  try {
    const buyer = db.Buyers.findOne({
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
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
