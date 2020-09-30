const db = require('../../../../models');

export async function getFavouriteCategoryWithUserId(userId) {
  try {
    const data = await db.Favorites.findAll({
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
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
