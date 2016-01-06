import path from 'path';
import clusterRespawnApi from 'cluster-respawn';
import {merge} from 'lodash';
import debugLib from 'debug';

import webpackBackendConfig from '../../config/webpack.backend';
import bootstrap from './bootstrap';

const debug = debugLib('starter-kit:master');

bootstrap()
  .then(config => {
    const {server} = config;
    const {output} = webpackBackendConfig;

    const clusterSettings = merge({}, server, {
      exec: path.join(output.path, output.filename),
      onMessage: function(msg) {
        debug(`Got IPC message from PID ${this.process.id}: ${msg}`);
      }
    });

    clusterRespawnApi.init(clusterSettings).boot();
  })
  .catch(err => console.log(err));
