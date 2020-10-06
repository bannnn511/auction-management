const db = require('../../../../models');

export async function getOneSignalPlayerId(userId) {
  return db.OneSignal.findAll({ where: { userId }, raw: true });
}
