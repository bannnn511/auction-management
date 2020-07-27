const { Categories } = require('../../../../models');

export function getAllCategories() {
  try {
    const categories = Categories.findAll();
    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}
