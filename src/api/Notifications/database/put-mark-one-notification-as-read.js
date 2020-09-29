import { Sequelize } from '../../../../models';

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
    await db.Notifications.update(
      { isRead: true },
      {
        where: {
          userId: data.userId,
          description: Sequelize.literal(
            `MATCH(description) AGAINST(${data.description}) IN NATURAL LANGUAGE MODE`,
          ),
          createdAt: data.createdAt,
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
