const db = require('../../../../models');

export async function updateReminderCreated(data) {
  db.AuctionParticipating.update(
    {
      isReminderCreated: true,
    },
    {
      where: {
        userId: data.userId,
        auctionId: data.auctionId,
      },
    },
  );
}
