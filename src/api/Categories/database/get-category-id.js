const db = require('../../../../models');

export async function getCategoryId(category) {
  try {
    const data = await db.Categories.findOne({
      attributes: ['id'],
      where: {
        categoryName: category,
      },
    });
    return data.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}
