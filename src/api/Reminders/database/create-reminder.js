const db = require('../../../../models');

/**
 * A reminder
 * @typedef {{userId: string, auctionId: string, pushAt: date}} Reminder
 */

/**
 * Create reminder for notification push.
 *
 * @export
 * @param {Reminder} Reminder - Notifications will be fire base on this.
 */
export function createReminder(reminder) {
  db.Reminders.create({
    userId: reminder.userId,
    auctionId: reminder.auctionId,
    pushAt: reminder.pushAt,
    isPushed: false,
  });
}
