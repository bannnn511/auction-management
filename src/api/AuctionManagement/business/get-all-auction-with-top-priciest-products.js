import { safeParseInt } from '../../../shared/helpers';

const _ = require('lodash');
const db = require('../../../../models');

const { Op } = db.Sequelize;

export async function getAuctionsWithTopNProducts(option) {
  try {
    return await db.AuctionManagements.findAll({
      include: [{ model: db.Products, as: 'products' }],
      order: [[{ model: db.Products, as: 'products' }, 'currentPrice', 'DESC']],
      limit: safeParseInt(option, 5),
      where: {
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
