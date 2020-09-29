import { UserType, UserStatus } from '../../../shared/helpers/constant';
import { pagination } from '../../../shared/helpers';

const db = require('../../../../models');

export function getBuyersWithOptions(page, pagesize, isSeller, type) {
  const { offset, limit } = pagination(page, pagesize);
  let defaultType = type;
  if (isSeller === true && type === UserType.SELLER) {
    defaultType = UserType.BUYER;
  }
  let buyer;
  if (type === undefined && isSeller !== undefined) {
    buyer = db.Buyers.findAll({
      where: {
        isSeller,
        status: UserStatus.ACTIVE,
      },
      offset,
      limit,
    });
  } else if (isSeller === undefined && type !== undefined) {
    buyer = db.Buyers.findAll({
      where: {
        status: UserStatus.ACTIVE,
        type: defaultType,
      },
      offset,
      limit,
    });
  } else {
    buyer = db.Buyers.findAll({
      where: {
        isSeller,
        status: UserStatus.ACTIVE,
        type: defaultType,
      },
      offset,
      limit,
    });
  }
  return buyer;
}
