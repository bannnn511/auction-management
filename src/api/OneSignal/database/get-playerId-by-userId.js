const db = require('../../../../models');

export async function getOneSignalPlayerId(userId) {
  const data = await db.OneSignal.findOne({ where: { userId }, raw: true });
  return data.playerId;
}
