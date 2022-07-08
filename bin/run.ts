#!/usr/bin/env node
import { createServer } from 'http';
import  config  from '../config/index';
import App from '../src/service';

const server = createServer(App);

server.listen(config.port);

server.on('listening', () => {

  process.on('uncaughtException', () => {
    process.exit(0);
  });

  process.on('SIGINT', () => {
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    process.exit(0);
  });

  config.log.info(
    `Hi there! I'm listening on port ${server.address()} in ${process.env.NODE_ENV} mode.`,
  );
});
