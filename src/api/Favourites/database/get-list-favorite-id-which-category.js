const db = require('../../../../models');

export async function getFavouriteUserIdFromCategory(categoryId) {
  return db.Favorites.findAll({
    where: {
      categoryId,
    },
  });
}
