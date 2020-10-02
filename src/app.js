require('@babel/register');
require('@babel/polyfill');
require('dotenv').config();

const express = require('express');
const loaders = require('./loaders');

const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

loaders.default({ app, server });
