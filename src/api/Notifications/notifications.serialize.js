import * as _ from 'lodash';

export function serializeNotification(notification) {
  if (notification) {
    return {
      userId: _.get(notification, 'userId', ''),
      description: _.get(notification, 'description', ''),
    };
  }
  return null;
}

export function serializeAllNotifications(notifications) {
  if (notifications) {
    const data = [];
    notifications.forEach((notification) => {
      data.push(serializeNotification(notification));
    });
    return notifications;
  }
  return null;
}
