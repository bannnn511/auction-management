import { UserBanStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function getUserBanStatusFromAuctions(data) {
  const auction = await db.AuctionParticipating.findOne({
    where: {
      auctionId: data.auctionId,
      userId: data.userId,
      status: UserBanStatus.BAN,
    },
  });
  if (auction == null) {
    return UserBanStatus.ACTIVE;
  }
  return auction.status;
}
