const redis = require('redis');

const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
});

module.exports = { client };
