const db = require('../../../../models');

export async function getCategory(id) {
  try {
    const category = await db.Categories.findOne({
      where: {
        id,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}
