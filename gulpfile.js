// Register babel
require('babel-core/register');

var gulp = require('gulp-help')(require('gulp'));
var reload = process.env.RELOAD == 'true';

var webpackConfig = {
  backend: require('./config/webpack.backend').default,
  frontend: require('./config/webpack.frontend').default
};

// Load Gulp tasks
['build', 'clean', 'devServer', 'devWatch', 'server']
  .map(function(name) { return require('./tasks/' + name).default; })
  .forEach(function(loadTask) {
    loadTask({
      gulp: gulp,
      webpackConfig: webpackConfig,
      serverReload: reload
    });
  });
