 /*eslint no-process-exit: 0*/

import path from 'path';
import clusterRespawnApi from 'cluster-respawn';
import {merge} from 'lodash';
import debugLib from 'debug';

import configStore from '../app/core/configStore';
import bootstrap from '../app/core/bootstrap';

const debug = debugLib('starter-kit:devServer');

export default function devServer(inject) {
  const {gulp, webpackConfig: {backend: {output}}, serverReload} = inject;

  gulp.task('dev-server', 'Start dev server.', done => {
    bootstrap()
      .then(({config, hub}) => {
        const {server} = config;

        const clusterSettings = merge({}, server, {
          exec: path.join(output.path, output.filename),
          onMessage: function(msg) {
            debug(`Got IPC message from PID ${this.process.id}: ${msg}`);
          }
        });

        clusterRespawnApi.init(clusterSettings).on('shutdown', done).boot();

        if(serverReload) { // restart dev server when config changes
          hub.on('configUpdate', () => {
            const newConfig = configStore.getCurrent();
            clusterRespawnApi.respawn(newConfig.server.childProcesses);
          });
        }
      })
      .catch(err => {
        done(err);
        process.exit(1);
      });
  });
}
