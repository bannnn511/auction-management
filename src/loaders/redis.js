import redis from 'redis';

const chalk = require('chalk');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

function init() {
  client.on('connect', () => {
    console.info(chalk.magenta('[REDIS] client connected'));
  });
  client.on('error', (error) => {
    console.error(chalk.magenta('[REDIS] not connected', error));
  });
}
module.exports = { init, client };
