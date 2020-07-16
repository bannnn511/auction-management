require('@babel/register');
require('@babel/polyfill');

const express = require('express');
require('dotenv').config();
const { json } = require('body-parser');
const { errorHandler } = require('./shared/middleware/error-handler');
const { userRouter } = require('./api/user/user.router');
const { buyersRouter } = require('./api/Buyers/buyers.router');
const { authorized } = require('./shared/middleware/authentication');

const app = express();

app.use(json());
app.use('/api/users', authorized, userRouter);
app.use('/api/buyers', buyersRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listing on port: ${PORT}`);
});
