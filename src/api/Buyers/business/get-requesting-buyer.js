import { UserType, UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export function getRequestingBuyers(isSeller, type) {
  try {
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
      });
    } else if (isSeller === undefined && type !== undefined) {
      buyer = db.Buyers.findAll({
        where: {
          status: UserStatus.ACTIVE,
          type: defaultType,
        },
      });
    } else {
      buyer = db.Buyers.findAll({
        where: {
          isSeller,
          status: UserStatus.ACTIVE,
          type: defaultType,
        },
      });
    }
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
