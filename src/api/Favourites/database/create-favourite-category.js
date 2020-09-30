const db = require('../../../../models');

export async function createFavoriteCategory(userId, categoryId) {
  return db.Favorites.create({
    userId,
    categoryId,
    createdBy: userId,
    updateBy: userId,
  });
}
