import { Date } from 'core-js';
import * as _ from 'lodash';
import {
  getListRemindersUncreated,
  updateReminderCreated,
} from '../api/AuctionParticipating/database';
import { createNotification } from '../api/Notifications/database/post-create-notification';
import {
  createReminder,
  getUnpuhsedReminders,
  updateReminderToCreated,
} from '../api/Reminders/database';

const cron = require('node-cron');

/**
 * A reminder
 * @typedef {{userId: string, auctionId: string, pushAt: date}} Reminder
 *
 * A reminder
 * @typedef {date} Date
 */

/**
 * Create reminders.
 *
 * @param {Reminder} reminder
 * @param {Date} dates - array of dates to push notifications.
 */
function createReminderWithArrayOfDays(reminder, dates) {
  dates.forEach((date) => {
    createReminder({
      userId: reminder.userId,
      auctionId: reminder.auctionId,
      pushAt: date,
    });
  });
}

export class Cron {
  constructor(app) {
    this.uncreatedReminders = [];
    this.unpuhedNotifications = [];
    this.io = app.get('socket');
    this.activeAuctions = app.get('activeAuctions');
  }

  /**
   * Start all cron jobs.
   *
   * @memberof Cron
   */
  start() {
    console.log('Cron jobs started');
    this.getUnCreatedReminder();
    this.createReminderForNotfications();
    this.getUnpushedNotifications();
    this.fireNotifications();
  }

  /**
   * Cron job for getting list of auction and user where reminders were not created.
   *
   * @memberof Cron
   */
  getUnCreatedReminder() {
    cron.schedule('*/1 * * * *', () => {
      this.uncreatedReminders = getListRemindersUncreated();
    });
  }

  /**
   * Cron job for creating notfications.
   *
   * @memberof Cron
   */
  createReminderForNotfications() {
    cron.schedule('*/1 * * * *', () => {
      if (this.uncreatedReminders.length > 0) {
        this.uncreatedReminders.forEach(async (reminder, index, object) => {
          const endat = new Date(_.get(reminder, 'auctionManagements.endAt'));
          const dates = [];
          dates.push(endat.setDate(endat.getDate() + 1));
          dates.push(new Date(endat - 3600 * 1000 * 24 * 2));
          dates.push(new Date(endat - 3600 * 1000 * 24));
          await createReminderWithArrayOfDays(reminder, dates);
          updateReminderCreated(reminder);
          object.splice(index, 1);
        });
      }
    });
  }

  /**
   * Cron job for getting unpushed notifications.
   *
   * @memberof Cron
   */
  getUnpushedNotifications() {
    cron.schedule('*/1 * * * *', async () => {
      this.unpuhedNotifications = await getUnpuhsedReminders();
    });
  }

  /**
   * Push notifications
   * Update isPushed in Reminders to true;
   * Create notification logs;
   *
   * @memberof Cron
   */
  fireNotifications() {
    this.io.emit('askForUserId');
    cron.schedule('*/1 * * * *', () => {
      this.unpuhedNotifications.forEach((noti) => {
        if (noti.pushAt <= new Date(_.now())) {
          const description = 'Your participating auctions is about to end';
          this.io
            .to(this.activeAuctions[noti.userId])
            .emit('notification', description);
          updateReminderToCreated(noti);
          createNotification({ userId: noti.userId, description });
        }
      });
    });
  }
}
