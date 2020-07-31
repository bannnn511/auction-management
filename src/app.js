/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');
require('@babel/polyfill');
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { json } = require('body-parser');
const logger = require('morgan');
const { errorHandler } = require('./shared/middleware/error-handler');
const {
  clientViewRouter,
} = require('./viewHandler/client-view-handler/client-view.router');
const { apiRouter } = require('./api');
const {
  adminViewRouter,
} = require('./viewHandler/admin-view-handler/admin-view.router');

const app = express();
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

app.use('/', clientViewRouter);
app.use('/admin', adminViewRouter);
app.use('/api', apiRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listing on port: ${PORT}`);
});
