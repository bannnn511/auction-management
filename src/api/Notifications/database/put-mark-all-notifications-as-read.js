const db = require('../../../../models');

/**
 * Update all isRead field of a user to true.
 *
 * @param  {string} userId - The Id of user.
 * @return {Object} An array of notifications object.
 */

export async function markAllNotificationsAsRead(userId) {
  try {
    return db.Notifications.update(
      {
        isRead: true,
      },
      {
        where: {
          userId,
        },
      },
    );
  } catch (error) {
    console.error(error);
    return error;
  }
}
