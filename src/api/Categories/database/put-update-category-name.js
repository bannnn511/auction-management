const db = require('../../../../models');

export async function updateCategory(categoryId, categoryName) {
  try {
    await db.Categories.update({ categoryName }, { where: { id: categoryId } });
    return await db.Categories.findOne({
      attribute: ['categoryName', 'createdBy', 'updatedBy'],
      where: {
        id: categoryId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
