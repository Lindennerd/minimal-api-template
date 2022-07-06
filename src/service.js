import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import { createRequire } from 'module';

import routes from './routes/index.js';

const require = createRequire(import.meta.url);
const swaggerFile = require('./swagger-output.json');


const service = express();

export default (config) => {
  
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
  service.use('/doc', serve, setup(swaggerFile));

  return service;
};
