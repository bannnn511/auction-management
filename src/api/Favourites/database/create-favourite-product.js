const db = require('../../../../models');

export async function createFavouriteProduct(userId, productId) {
  try {
    const product = await db.Favorites.create({
      userId,
      productId,
      createdBy: userId,
      updatedBy: userId,
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
