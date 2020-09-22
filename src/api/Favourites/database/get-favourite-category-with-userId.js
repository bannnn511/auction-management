const db = require('../../../../models');

export async function getFavouriteCategoryWithUserId(userId) {
  try {
    return await db.Favorites.findAll({
      where: {
        userId,
        productId: null,
      },
      include: [
        {
          model: db.Categories,
          as: 'categories',
          attributes: ['categoryName'],
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
