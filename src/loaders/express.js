const helmet = require('helmet');
const cors = require('cors');
const { json } = require('body-parser');
const logger = require('morgan');
const { errorHandler } = require('../shared/middleware/error-handler');
const { apiRouter } = require('../api');

export default async ({ app }) => {
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

  // Error handling middleware, we delegate the handling to the centralized error handler
  app.use(errorHandler);
};
