const db = require('../../../../models');

export async function updateUserPlusPoint(id) {
  try {
    await db.Buyers.increment(
      {
        plusPoint: 1,
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
