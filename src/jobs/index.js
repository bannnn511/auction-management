import * as _ from 'lodash';
import {
  getListRemindersUncreated,
  updateReminderCreated,
} from '../api/AuctionParticipating/database';
import { createReminder, getReminders } from '../api/Reminders/database';

const cron = require('node-cron');

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
  constructor() {
    this.uncreatedReminders = [];
  }

  start() {
    console.log('Cron jobs started');
    this.getUnCreatedReminder();
    this.createReminderForNotfications();
  }

  getUnCreatedReminder() {
    cron.schedule('*/1 * * * *', async () => {
      this.uncreatedReminders = await getListRemindersUncreated();
    });
  }

  createReminderForNotfications() {
    cron.schedule('*/1 * * * *', () => {
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
    });
  }
}
