const db = require('../../../../models');

export async function deleteUserDidLikeCategory(categoryId, userId) {
  try {
    return await db.Favorites.destroy({
      where: {
        categoryId,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
