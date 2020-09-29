const db = require('../../../../models');

/**
 * Update all isRead field of a user to true.
 *
 * @param  {string} userId - The Id of user.
 * @return {Object} An array of notifications object.
 */

export async function markAllNotificationsAsRead(userId) {
  try {
    const data = await db.Notifications.update(
      {
        isRead: false,
      },
      {
        where: {
          userId,
        },
      },
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
