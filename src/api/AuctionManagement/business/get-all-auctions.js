import * as _ from 'lodash';
import { pagination } from '../../../shared/helpers';

const db = require('../../../../models');

const { Op } = db.Sequelize;

// get data of auction + products with JOIN
export async function getAllAuctions(page, pagesize) {
  try {
    const { offset, limit } = pagination(page, pagesize);
    console.log(offset, limit);
    const auctions = await db.AuctionManagements.findAll({
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
      },
      order: [['endAt', 'ASC']],
      limit,
      offset,
    });
    return auctions;
  } catch (error) {
    console.log(error);
    return null;
  }
}
