const db = require('../../../../models');

export async function createFavouriteProduct(userId, productId) {
  try {
    return await db.Favorites.create({
      userId,
      productId,
      createdBy: userId,
      updatedBy: userId,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
