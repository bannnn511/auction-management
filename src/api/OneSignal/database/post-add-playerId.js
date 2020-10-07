const db = require('../../../../models');

export async function addOneSignalPlayerId(data) {
  return db.OneSignal.create({
    userId: data.userId,
    playerId: data.playerId,
  });
}
