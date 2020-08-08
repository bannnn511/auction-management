import * as _ from 'lodash';

const db = require('../../../../models');

const { Op } = db.Sequelize;
export async function getAuctionOnMarketOfASellerBusiness(id) {
  try {
    return await db.AuctionManagements.findAll({
      include: [
        {
          model: db.Products,
          as: 'products',
        },
      ],
      where: {
        sellerId: id,
        buyerId: null,
        endAt: {
          [Op.gt]: _.now(),
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
