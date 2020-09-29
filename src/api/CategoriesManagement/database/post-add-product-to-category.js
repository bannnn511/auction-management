const db = require('../../../../models');

export async function addProductToCategory(data, t) {
  return db.CategoryManagements.create(
    {
      categoryId: data.categoryId,
      productId: data.productId,
      createdBy: data.byId,
      updatedBy: data.byId,
    },
    { transaction: t },
  );
}
