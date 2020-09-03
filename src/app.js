/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');
require('@babel/polyfill');
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { json } = require('body-parser');
const logger = require('morgan');
const { errorHandler } = require('./shared/middleware/error-handler');
const { apiRouter } = require('./api');

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

const { client } = require('./shared/helpers/redis');

client.on('connect', () => {
  console.log('Redis client connected');
});
client.on('error', (error) => {
  console.log('Redis not connected', error);
});

app.use(logger('dev'));
app.use(json());

app.use('/api', apiRouter);

app.use('*', (req, res) => {
  res.status(400).json({ error: 'Invalid address' });
});
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
