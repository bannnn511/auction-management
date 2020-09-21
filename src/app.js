require('@babel/register');
require('@babel/polyfill');
require('dotenv').config();

const express = require('express');
const socketio = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const { json } = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');

const { errorHandler } = require('./shared/middleware/error-handler');
const { apiRouter } = require('./api');
const { client } = require('./shared/helpers/redis');
const { responseError } = require('./shared/helpers');

const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: ['X-Total-Count'],
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(logger('dev'));
app.use(json());
app.use('/api', apiRouter);
app.use('*', (req, res) => {
  responseError(res, 'Invalid address');
});
app.use(errorHandler);

client.on('connect', () => {
  console.info(chalk.magenta('[REDIS] client connected'));
});
client.on('error', (error) => {
  console.error(chalk.magenta('[REDIS] not connected', error));
});
// winston
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

const io = socketio(server);
const activeAuctions = {};

io.sockets.on('connection', (socket) => {
  console.log(chalk.magenta('[SOCKET] connected:', socket.id));
  // console.log('Auctions:', Object.keys(activeAuctions).length);

  socket.on('userIdReceived', (userId) => {
    activeAuctions[socket.id] = userId;
  });

  socket.on('disconnect', () => {
    delete activeAuctions[socket.id];
    console.log(chalk.red('[SOCKET] disconnected', socket.id));
    io.emit('auction disconnected', socket.id);
  });
});

app.set('socket', io);
app.set('activeAuction', activeAuctions);
