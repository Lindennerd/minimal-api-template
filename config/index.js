const path = require('path');

const bunyan = require('bunyan');
// Load package.json
const pjs = require('../package.json');

// Get some meta info from the package.json
const { name, version, port } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

// Configuration options for different environments
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

module.exports = config[process.env.NODE_ENV || 'development'];