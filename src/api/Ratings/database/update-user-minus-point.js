const db = require('../../../../models');

export async function updateUserMinusPoint(id) {
  return db.Buyers.increment(
    {
      minusPoint: 1,
    },
    {
      where: {
        id,
      },
    },
  );
}
