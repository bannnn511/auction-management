import * as _ from 'lodash';

const db = require('../../../../models');

const { Op } = db.Sequelize;

// get data of auction + products with JOIN
export async function getAuctionById(id) {
  const auctions = await db.AuctionManagements.findOne({
    include: [
      {
        model: db.Products,
        as: 'products',
      },
    ],
    where: {
      endAt: {
        [Op.gt]: _.now(),
      },
      id,
    },
  });
  return auctions;
}
