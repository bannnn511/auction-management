const db = require('../../../../models');

export async function updateUserPlusPoint(id) {
  return db.Buyers.increment(
    {
      plusPoint: 1,
    },
    {
      where: {
        id,
      },
    },
  );
}
