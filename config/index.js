import { createLogger } from 'bunyan';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { name, version, port } = require('../package.json');
const getLogger = (serviceName, serviceVersion, level) => createLogger({ name: `${serviceName}:${serviceVersion}`, level });

const config = {
  development: {
    name,
    version,
    port,
    serviceTimeout: 30,
    database: 'mongodb://localhost:27017/what-am-i-reading',
    secret: 'dev-secret',
    log: () => getLogger(name, version, 'debug'),

  },
  production: {
    name,
    version,
    port,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'info'),

  },
  test: {
    name,
    version,
    port,
    database: 'mongodb://localhost:27017/' + name,
    secret: 'dev-secret',
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal'),
  },
};

export default config[process.env.NODE_ENV || 'development'];