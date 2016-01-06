import path from 'path';
import clusterRespawnApi from 'cluster-respawn';

import bootstrap from '../app/core/bootstrap';

export default function server(inject) {
  const {gulp, webpackConfig: {output}} = inject;

  gulp.task('server', 'Start staging/production server.', ['build'], done => {
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
      })
      .catch(err => done(err));
  });
}
