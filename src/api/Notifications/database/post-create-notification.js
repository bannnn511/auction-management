const db = require('../../../../models');

export async function createNotification(data) {
  try {
    return await db.Notifications.create({
      userId: data.userId,
      description: data.description,
      isRead: false,
      createdBy: data.userId,
      updatedBy: data.userId,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
