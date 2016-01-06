 /*eslint no-process-exit: 0*/

import path from 'path';
import clusterRespawnApi from 'cluster-respawn';
import {merge} from 'lodash';

import bootstrap from '../app/core/bootstrap';

export default function devServer(inject) {
  const {gulp, webpackConfig: {backend: {output}}} = inject;

  gulp.task('dev-server', 'Start dev server.', done => {
    bootstrap()
      .then(config => {
        const {server} = config;

        const clusterSettings = merge({}, server, {
          exec: path.join(output.path, output.filename),
          onMessage: function(msg) {
            debug(`Got IPC message from PID ${this.process.id}: ${msg}`);
          }
        });

        clusterRespawnApi.init(clusterSettings).on('shutdown', done).boot();

        // restart devServer when config changes
        //hub.on('configUpdate', () => clusterMaster.respawn());
      })
      .catch(err => {
        done(err);
        process.exit(1);
      });
  });
}
