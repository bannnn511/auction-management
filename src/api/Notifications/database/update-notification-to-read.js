import { Sequelize } from '../../../../models';

const db = require('../../../../models');

export async function updateNotificationToRead(data) {
  try {
    return await db.Notifications.update(
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
  } catch (error) {
    console.log(error);
    return null;
  }
}
