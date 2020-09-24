const db = require('../../../../models');

export async function createNotification(data) {
  try {
    return await db.notifications.create({
      userId: data.userId,
      description: data.description,
      isRead: false,
      createdBy: data.byId,
      updatedBy: data.byId,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
