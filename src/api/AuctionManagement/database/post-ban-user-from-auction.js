import { UserBanStatus } from '../../../shared/helpers/constant';

const db = require('../../../../models');

export async function banUserFromAuctions(data) {
  try {
    return await db.AuctionParticipating.create({
      userId: data.userId,
      auctionId: data.auctionId,
      status: UserBanStatus.BAN,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
