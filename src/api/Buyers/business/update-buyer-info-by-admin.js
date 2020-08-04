import * as _ from 'lodash';
import { UserType, UserStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function updateAUserInfoByAdmin(id, buyer, defaultInfo) {
  try {
    let checkBuyerPendingStatus = buyer.isSeller;
    if (buyer.type === UserType.SELLER) {
      checkBuyerPendingStatus = false;
    }
    await db.Buyers.update(
      {
        fullname: _.defaultTo(buyer.fullname, defaultInfo.fullname),
        address: _.defaultTo(buyer.address, defaultInfo.address),
        isSeller: _.defaultTo(checkBuyerPendingStatus, defaultInfo.isSeller),
        updatedBy: _.defaultTo(buyer.updatedBy, defaultInfo.updatedBy),
        type: _.defaultTo(buyer.type, defaultInfo.type),
        status: _.defaultTo(buyer.status, defaultInfo.type),
      },
      {
        where: {
          id,
        },
      },
    );

    return await db.Buyers.findOne({
      where: {
        id,
        status: UserStatus.ACTIVE,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
