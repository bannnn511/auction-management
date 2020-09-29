const db = require('../../../../models');

export async function getListNotifications(userId) {
  try {
    return await db.Notifications.findAll({
      where: { userId },
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}
