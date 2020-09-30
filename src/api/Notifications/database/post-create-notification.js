const db = require('../../../../models');

export async function createNotification(data) {
  return db.Notifications.create({
    userId: data.userId,
    description: data.description,
    isRead: false,
    createdBy: data.userId,
    updatedBy: data.userId,
  });
}
