const https = require('https');

/**
 * Send based on OneSignal PlayerIds - Create notification.
 * @typedef {Object} Notification
 * @property {string} app_id - The id of onesignal app
 * @property {object} contents - The content of the push notification
 * @property {[string]} include_player_ids - OneSignnal PlayerIds
 *
 * Examples:
 * var message = {
  app_id: '5eb5a37e-b458-11e3-ac11-000c2940e62c',
  contents: { en: 'English Message' },
  include_player_ids: [
    '6392d91a-b206-4b7b-a620-cd68e32c3a76',
    '76ece62b-bcfe-468c-8a78-839aeaa8c5fa',
    '8e0f21fa-9a5a-4ae7-a9a6-ca1f24294b86',
  ],
};
 */

/**
 * Send notifications through onesignal.
 *
 * @param {Notification} data
 */
export const sendNotification = (data) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  const options = {
    host: 'onesignal.com',
    port: 443,
    path: '/api/v1/notifications',
    method: 'POST',
    headers,
  };

  const req = https.request(options, (res) => {
    res.on('data', (payload) => {
      console.log('Response:');
      console.log(JSON.parse(payload));
    });
  });

  req.on('error', (e) => {
    console.log('ERROR:');
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};
