import { safeParseInt } from '../../../shared/helpers';
import { defaultLimit } from '../../../shared/helpers/constant';

const _ = require('lodash');
const db = require('../../../../models');

const { Op } = db.Sequelize;
export async function getAuctionsSortByRemaingTime(option) {
  return db.AuctionManagements.findAll({
    include: [{ model: db.Products, as: 'products' }],
    where: {
      endAt: {
        [Op.gt]: _.now(),
      },
    },
    limit: safeParseInt(option, defaultLimit.MAX),
    order: [['end_at', 'DESC']],
  });
}
