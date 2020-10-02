const db = require('../../../../models');

export function updateReminderToCreated(data) {
  db.Reminders.update(
    {
      isPushed: true,
    },
    {
      where: {
        userId: data.userId,
        auctionId: data.auctionId,
        pushAt: data.pushAt,
      },
    },
  );
}
