import { pagination } from '../../../shared/helpers';

const db = require('../../../../models');

export async function getFavouriteProducts(userId, page, pagesize) {
  try {
    const { offset, limit } = pagination(page, pagesize);
    const products = await db.Favorites.findAll({
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
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
}
