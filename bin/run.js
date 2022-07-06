#!/usr/bin/env node
import {createServer} from 'http';

import config from '../config/index.js';

const log = config.log();
import service from '../src/service.js';

const server = createServer(service(config));

// Important - a service should not have a fixed port but should randomly choose one
server.listen(config.port);

server.on('listening', () => {

  process.on('uncaughtException', async () => {
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    process.exit(0);
  });

  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${service.get('env')} mode.`,
  );
});
