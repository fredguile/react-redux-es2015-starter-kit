import gutil from 'gulp-util';
import {promisifyAll} from 'bluebird';
import webpack from 'webpack';
import Promise from 'bluebird';

if(!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV!');
}

const DEVELOPMENT = process.env.NODE_ENV === 'development';

export default function build(inject) {
  const {gulp, webpackConfig} = inject;

  gulp.task('build', 'Build project.', ['clean'], done => {
    const compilers = [
      asyncWebpackCompiler(webpackConfig.backend)
    ];

    if(!DEVELOPMENT) {
      compilers.push(asyncWebpackCompiler(webpackConfig.frontend));
    }

    Promise
      .all(compilers.map(compiler => compiler.runPromisified()))
      .spread((backendStats, frontendStats) => {
        if(backendStats.hasErrors() || backendStats.hasWarnings()) {
          gutil.beep();
        }

        if(frontendStats && (frontendStats.hasErrors() || frontendStats.hasWarnings())) {
          gutil.beep();
        }

        gutil.log(gutil.colors.grey(backendStats.toString({
          hash: false,
          version: true,
          timings: true,
          assets: true,
          chunks: DEVELOPMENT,
          errorDetails: DEVELOPMENT
        })));

        if(frontendStats) {
          gutil.log(gutil.colors.white(frontendStats.toString({
            hash: false,
            version: false,
            timings: true,
            assets: true,
            chunks: DEVELOPMENT,
            errorDetails: DEVELOPMENT
          })));
        }

        done();
      });
  });
}

function asyncWebpackCompiler(config) {
  const compiler = webpack(config);
  return promisifyAll(compiler, {suffix: 'Promisified'});
}
