import {
  UserType,
  UserStatus,
  UserIsSeller,
} from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getRequestingBuyers() {
  try {
    const buyer = db.Buyers.findAll({
      attributes: [
        'id',
        'email',
        'type',
        'status',
        'address',
        'fullname',
        'isSeller',
        'plusPoint',
        'minusPoint',
        'createdBy',
        'updatedBy',
      ],
      where: {
        isSeller: UserIsSeller.PENDING,
        status: UserStatus.ACTIVE,
        type: UserType.BUYER,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
