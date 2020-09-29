const { Categories } = require('../../../../models');

export async function createCategory(category) {
  return Categories.create({
    categoryName: category.categoryName,
    createdBy: category.createdBy,
    updatedBy: category.updatedBy,
  });
}
