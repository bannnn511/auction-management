const db = require('../../../../models');

export async function getFavouriteProduct(productId) {
  try {
    const products = await db.Favorites.findOne({
      where: {
        productId,
      },
    });
    console.log(products);
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
}
