/*eslint no-process-exit: 0*/

import http from 'http';
import express from 'express';

import bootstrap from './bootstrap';
import configureApp from './helpers/configureApp';
import addRoutes from './helpers/addRoutes';
import HMRListener from './initializers/hmrListener';

if(!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV!');
}

bootstrap()
  .then(config => {
    const {server: {port, antiHangTimeout}} = config;
    const app = express();

    const antiHangTimer = setTimeout(() => {
      console.error(`antiHangTimeout triggered after ${antiHangTimeout} ms`);
      process.exit(1);
    }, antiHangTimeout);
    antiHangTimer.unref();

    configureApp(app, config);
    addRoutes(app, config);

    const server = http.createServer(app);
    server.listen(port, () => clearTimeout(antiHangTimer));

    // development only: start HMR listener
    if(process.env.NODE_ENV === 'development') {
      const hmrListener = new HMRListener();
      server
        .on('listening', () => hmrListener.listen(server))
        .on('close', () => hmrListener.close());
    }
  });
