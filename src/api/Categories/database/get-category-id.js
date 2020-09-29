const db = require('../../../../models');

export async function getCategoryId(category) {
  const data = await db.Categories.findOne({
    attributes: ['id'],
    where: {
      categoryName: category,
    },
  });
  return data.id;
}
