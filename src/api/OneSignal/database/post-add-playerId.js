const db = require('../../../../models');

export async function addOneSignalPlayerId(data) {
  return db.create({
    userId: data.userId,
    playerId: data.playerId,
  });
}
