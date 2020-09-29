import { safeParseInt } from '../../../shared/helpers';
import { defaultLimit } from '../../../shared/helpers/constant';

const _ = require('lodash');
const db = require('../../../../models');

const { Op } = db.Sequelize;

export async function getAuctionsWithTopNProducts(option) {
  return db.AuctionManagements.findAll({
    include: [{ model: db.Products, as: 'products' }],
    order: [[{ model: db.Products, as: 'products' }, 'currentPrice', 'DESC']],
    limit: safeParseInt(option, defaultLimit.MAX),
    where: {
      endAt: {
        [Op.gt]: _.now(),
      },
    },
  });
}
