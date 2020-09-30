const db = require('../../../../models');

export async function getListNotifications(userId) {
  try {
    const data = await db.Notifications.findAll({
      where: { userId },
      raw: true,
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
