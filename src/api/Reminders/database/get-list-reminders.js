const db = require('../../../../models');

export function getReminders() {
  return db.Reminders.findAll({});
}
