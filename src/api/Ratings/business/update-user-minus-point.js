const db = require('../../../../models');

export async function updateUserMinusPoint(id) {
  try {
    await db.Buyers.increment(
      {
        minusPoint: 1,
      },
      {
        where: {
          id,
        },
      },
    );
    return 400;
  } catch (error) {
    console.log(error);
    return null;
  }
}
