const db = require('../../../../models');

export async function getAllOneSignalPlayerId(userId) {
  const data = await db.OneSignal.findAll({ where: { userId }, raw: true });
  const playerIds = [];
  data.forEach((player) => {
    playerIds.push(player.playerId);
  });
  return playerIds;
}
