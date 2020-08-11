const { Categories } = require('../../../../models');

export function createCategory(category) {
  try {
    const data = Categories.create({
      categoryName: category.categoryName,
      createdBy: category.createdBy,
      updatedBy: category.updatedBy,
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
