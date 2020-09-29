import { pagination } from '../../../shared/helpers';

const db = require('../../../../models');

const { Op } = db.Sequelize;

export async function getAuctionSoldBySellerBusiness(page, pagesize, id) {
  const { offset, limit } = pagination(page, pagesize);
  return db.AuctionManagements.findAll({
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
}
