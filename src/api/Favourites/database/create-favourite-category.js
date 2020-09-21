const db = require('../../../../models');

export async function createFavoriteCategory(userId, categoryId) {
  try {
    return await db.Favorites.create({
      userId,
      categoryId,
      createdBy: userId,
      updateBy: userId,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
