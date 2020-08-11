const db = require('../../../../models');

export async function createFavouriteProduct(body) {
  try {
    const product = db.Favourite.create({
      userId: body.userId,
      productId: body.productId,
      createdBy: body.createdBy,
      updatedBy: body.updatedBy,
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
