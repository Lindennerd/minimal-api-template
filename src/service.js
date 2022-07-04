const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const cors = require('cors');

const service = express();
const routes = require('./routes');

module.exports = (config) => {
  
  const log = config.log();
  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });

  service.use(cors());
  service.use(express.json());

  service.use('/api', routes);
  service.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  return service;
};
