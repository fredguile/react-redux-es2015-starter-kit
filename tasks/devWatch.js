 /*eslint no-process-exit: 0*/

import gutil from 'gulp-util';
import webpack from 'webpack';
import clusterRespawnApi from 'cluster-respawn';
import debugLib from 'debug';
import {inspect} from 'util';

import statsSummary from './helpers/statsSummary';

const WATCH_INTERVAL = 1000; // 1s

const debug = debugLib('starter-kit:dev-watch');
let initialStart = true;

export default function devWatch(inject) {
  const {gulp, webpackConfig: {backend}, serverReload} = inject;

  gulp.task('dev-watch', 'Watch changes & start dev server.', ['clean'], done => {
    const watcher = webpack(backend).watch(WATCH_INTERVAL, (err, stats) => {
      if(err) return done(err);

      debug(inspect(statsSummary(stats), {depth: 3}));

      if(stats.hasErrors() || stats.hasWarnings()) {
        gutil.beep();

        if(initialStart) {
          process.exit(1);
        }
      }
      else {
        if(!initialStart && serverReload) {
          clusterRespawnApi.respawn();
        }
        else {
          initialStart = false;
          gulp.start(['dev-server']);
        }
      }
    });

    clusterRespawnApi.on('shutdown', () => {
      watcher.close();
      done();
    });
  });
}
