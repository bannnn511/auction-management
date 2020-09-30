const db = require('../../../../models');

/**
 * The payload
 * @typedef {{userId: string, createdAt: string, description: string}} Data
 */

/**
 * Update on notification "isRead" field to true.
 *
 * @param {Data} data - The data from request.
 * @return {Object} - An array of notifications object.
 */

export async function markANotificationAsRead(data) {
  try {
    console.log(data);
    await db.Notifications.update(
      { isRead: true },
      {
        where: {
          userId: data.userId,
          created_at: data.createdAt,
          description: data.description,
        },
      },
    );
    return db.Notifications.findAll({
      where: {
        userId: data.userId,
      },
      raw: true,
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}
