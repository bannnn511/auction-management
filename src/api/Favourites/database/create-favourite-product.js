const db = require('../../../../models');

export async function createFavouriteProduct(userId, productId) {
  return db.Favorites.create({
    userId,
    productId,
    createdBy: userId,
    updatedBy: userId,
  });
}
