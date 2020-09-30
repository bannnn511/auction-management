import { pagination } from '../../../shared/helpers';

const db = require('../../../../models');

export async function getFavouriteProducts(userId, page, pagesize) {
  const { offset, limit } = pagination(page, pagesize);
  return db.Favorites.findAll({
    offset,
    limit,
    where: {
      userId,
    },
    include: [
      {
        model: db.Products,
        as: 'products',
        attributes: ['productName'],
      },
    ],
  });
}
