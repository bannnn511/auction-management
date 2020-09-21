const db = require('../../../../models');

export async function getFavouriteUserIdFromCategory(categoryId) {
  try {
    return await db.Favorites.findAll({
      where: {
        categoryId,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
