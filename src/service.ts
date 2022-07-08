import express, { ErrorRequestHandler } from 'express';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import config from '../config/index';
import routes from './routes';

const swaggerFile = require('./swagger-output.json');


export default () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api', routes);
  app.use('/doc', serve, setup(undefined, {
    swaggerUrl: '/api/swagger.json',
  }));

  app.use(<ErrorRequestHandler>function (err, req, res, next) {
    config.log.error(err.stack);
    res.status(err.status ?? 500);
    res.json({
      success: false,
      error: 'Internal error occured'
    });
    next(err);
  })

  if (app.get('env') === 'development') { 
    app.use((req) => {
      config.log.debug('info', `${req.method} ${req.url}`);
    });
  }

  return app;
}