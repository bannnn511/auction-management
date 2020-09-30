import { UserBanStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function userParticipateAuctions(data) {
  return db.AuctionParticipating.create({
    userId: data.userId,
    auctionId: data.auctionId,
    status: UserBanStatus.ACTIVE,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
    isReminderCreated: false,
  });
}
