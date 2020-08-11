import * as _ from 'lodash';
import { pagination } from '../../../shared/helpers';

const db = require('../../../../models');

const { Op } = db.Sequelize;

export async function getAuctionSoldBySellerBusiness(page, pagesize, id) {
  try {
    const { offset, limit } = pagination(page, pagesize);
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
      offset,
      limit,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
