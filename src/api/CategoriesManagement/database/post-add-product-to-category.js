const db = require('../../../../models');

export async function addProductToCategory(data, t) {
  try {
    return await db.CategoryManagements.create(
      {
        categoryId: data.categoryId,
        productId: data.productId,
        createdBy: data.byId,
        updatedBy: data.byId,
      },
      { transaction: t },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
