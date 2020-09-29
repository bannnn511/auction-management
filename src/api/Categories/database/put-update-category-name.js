const db = require('../../../../models');

export async function updateCategory(categoryId, categoryName) {
  await db.Categories.update({ categoryName }, { where: { id: categoryId } });
  return db.Categories.findOne({
    attribute: ['categoryName', 'createdBy', 'updatedBy'],
    where: {
      id: categoryId,
    },
  });
}
