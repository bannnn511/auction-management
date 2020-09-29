const db = require('../../../../models');

export async function getCategory(id) {
  return db.Categories.findOne({
    where: {
      id,
    },
  });
}
