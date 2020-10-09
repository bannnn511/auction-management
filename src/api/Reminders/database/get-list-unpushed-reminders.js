const db = require('../../../../models');

/**
 * Get list of reminders where field isPushed == false.
 *
 * @export
 * @return {Promise<object[]>} List of Reminders.
 */
export async function getUnpuhsedReminders() {
  return db.Reminders.findAll({
    where: {
      isPushed: false,
    },
    raw: true,
    limit: 100,
  });
}
