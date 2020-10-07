const db = require('../../../../models');

export async function getOneSignalPlayerId(userId) {
  const data = await db.OneSignal.findAll({ where: { userId }, raw: true });
  return data.playerId;
}
