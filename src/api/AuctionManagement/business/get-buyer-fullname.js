const db = require('../../../../models');

export async function getUserName(id) {
  try {
    const user = db.Buyers.findOne({
      where: {
        id,
      },
      attributes: ['fullname'],
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
