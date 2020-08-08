import * as _ from 'lodash';

const db = require('../../../../models');

const { Op } = db.Sequelize;

export async function getAuctionSoldBySellerBusiness(id) {
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
        buyerId: {
          [Op.not]: null,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
