const db = require('../../../../models');

export async function addProductToCategory(data, t) {
  try {
    return await db.CategoryManagements.create(
      {
        categoryId: data.categoryId,
        proudctId: data.proudctId,
        createdBy: data.createdBy,
        updatedBy: data.updatedBy,
      },
      { transaction: t },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
