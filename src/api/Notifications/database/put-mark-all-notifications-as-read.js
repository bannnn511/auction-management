const db = require('../../../../models');

export async function markAllNotificationsAsRead(data) {
  try {
    await db.Notifications.update(
      {
        isRead: true,
      },
      {
        where: {
          userId: data.userId,
        },
      },
    );
    return await db.Notifications.findAll({
      where: {
        userId: data.userId,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
