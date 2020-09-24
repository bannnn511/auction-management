const db = require('../../../../models');

export async function getListNotifications(userId) {
  try {
    return await db.notifications.findAll({
      where: { userId },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
