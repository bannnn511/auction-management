import * as _ from 'lodash';

const db = require('../../../../models');

export async function requestingUpdatedInfo(buyer, defaultInfo) {
  try {
    await db.Buyers.update(
      {
        fullname: _.defaultTo(buyer.fullname, defaultInfo.fullname),
        address: _.defaultTo(buyer.address, defaultInfo.address),
        isSeller: _.defaultTo(buyer.isSeller, defaultInfo.isSeller),
        updatedBy: _.defaultTo(buyer.updatedBy, defaultInfo.updatedBy),
      },
      {
        where: {
          id: buyer.updatedBy,
        },
      },
    );

    return await db.Buyers.findOne({
      where: {
        id: buyer.updatedBy,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
