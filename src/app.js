/* eslint-disable import/no-extraneous-dependencies */
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

const app = express();
app.use(helmet());
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: ['X-Total-Count'],
};
app.use(cors(corsOptions));

client.on('connect', () => {
  console.log(chalk.magenta('[REDIS] client connected'));
});
client.on('error', (error) => {
  console.log(chalk.magenta('[REDIS] not connected', error));
});

app.use(logger('dev'));
app.use(json());

app.use('/api', apiRouter);

app.use('*', (req, res) => {
  res.status(400).json({ error: 'Invalid address' });
});
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

const io = socketio(server);
const activeAuctions = new Set();

io.sockets.on('connection', (socket) => {
  activeAuctions.add(socket);
  console.log(
    chalk.magenta('[SOCKET] make connection with Socket ID:', socket.id),
  );
  console.log('Auctions:', activeAuctions.size);

  socket.on('disconnect', () => {
    activeAuctions.delete(socket.id);
    console.log(chalk.red('[SOCKET] disconnected', socket.id));
    io.emit('auction disconnected', socket.id);
  });
});

app.set('socket', io);
