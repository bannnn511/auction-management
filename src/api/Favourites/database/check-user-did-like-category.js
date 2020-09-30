const db = require('../../../../models');

export async function checkIfUserDidLikeCategory(categoryId, userId) {
  try {
    return await db.Favorites.findAll({
      where: {
        categoryId,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}
