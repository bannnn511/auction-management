const db = require('../../../../models');

export async function getListRemindersUncreated() {
  return db.AuctionParticipating.findAll({
    include: [
      {
        model: db.AuctionManagements,
        as: 'auctionManagements',
      },
    ],
    where: {
      isReminderCreated: false,
    },
    raw: true,
    limit: 100,
  });
}
