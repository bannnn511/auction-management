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
import { sendNotification } from '../shared/helpers/onesignal';

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
 * Mutated dates.
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

/**
 * Push notifications with one signal.
 *
 * @param {*} description
 * @param {*} players
 */
function sendNotificationOneSignal(description, players) {
  const oneSignalMess = {
    app_id: process.env.ONESIGNAL_ID,
    contents: { en: description },
    include_player_ids: players,
  };
  sendNotification(oneSignalMess);
}

export class Cron {
  constructor(app) {
    this.uncreatedReminders = [];
    this.unpuhedNotifications = [];
    this.io = app.get('socket');
    this.activeAuctions = app.get('activeAuctions');
    this.isRunning = false;
    this.isNotifi = false;
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
   * isRunning - semaphore lock to run concurrently with createReminderForNotfications()
   *
   * @memberof Cron
   */
  getUnCreatedReminder() {
    cron.schedule('*/1 * * * *', async () => {
      if (!this.isRunning) {
        this.isRunning = true;
        this.uncreatedReminders = await getListRemindersUncreated();
        this.isRunning = false;
      }
    });
  }

  /**
   * Cron job for creating notfications.
   * isRunning - semaphore lock to run concurrently with getUnCreatedReminder()
   *
   * @memberof Cron
   */
  createReminderForNotfications() {
    cron.schedule('*/1 * * * *', () => {
      if (!this.isRunning) {
        this.isRunning = true;
        if (this.uncreatedReminders.length > 0) {
          this.uncreatedReminders.forEach(async (reminder, index, object) => {
            const endat = new Date(_.get(reminder, 'auctionManagements.endAt'));
            const dates = [];
            dates.push(endat.setDate(endat.getDate() + 1)); // after 24h
            dates.push(new Date(endat - 3600 * 1000 * 24 * 2)); // before 48h
            dates.push(new Date(endat - 3600 * 1000 * 24)); // before 24h
            createReminderWithArrayOfDays(reminder, dates);
            await updateReminderCreated(reminder);
            object.splice(index, 1);
          });
        }
        this.isRunning = false;
      }
    });
  }

  /**
   * Cron job for getting unpushed notifications.
   * isNotifi - semaphore clock to run concurrently with fireNotifications().
   *
   * @memberof Cron
   */
  getUnpushedNotifications() {
    cron.schedule('*/1 * * * *', async () => {
      if (!this.isNotifi) {
        this.isNotifi = true;
        this.unpuhedNotifications = await getUnpuhsedReminders();
        this.isNotifi = false;
      }
    });
  }

  /**
   * Push notifications
   * Update isPushed in Reminders to true;
   * Create notification logs;
   * isNotifi - semaphore clock to run concurrently with getUnpushedNotifications().
   *
   * @memberof Cron
   */
  fireNotifications() {
    this.io.emit('askForUserId');
    cron.schedule('*/1 * * * *', () => {
      this.unpuhedNotifications.forEach(async (noti) => {
        if (!this.isNotifi) {
          this.isNotifi = true;
          if (noti.pushAt <= new Date(_.now())) {
            const description = 'Your participating auctions is about to end';
            this.pushWithSocket(noti.userId, description);
            sendNotificationOneSignal();
            await updateReminderToCreated(noti);
            await createNotification({
              userId: noti.userId,
              description,
            });
          }
          this.isNotifi = false;
        }
      });
    });
  }

  pushWithSocket(userId, description) {
    this.io.to(this.activeAuctions[userId]).emit('notification', description);
  }
}
