const db = require('../../../../models');

export async function getCategory(id) {
  try {
    return await db.Categories.findOne({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
