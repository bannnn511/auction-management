/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');
require('@babel/polyfill');
require('dotenv').config();

const express = require('express');
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

app.use(logger('dev'));
app.use(json());

app.use('/', clientViewRouter);
app.use('/admin', adminViewRouter);
app.use('/api', apiRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listing on port: ${PORT}`);
});
