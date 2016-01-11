import Io from 'socket.io';
import webpack from 'webpack';
import debugLib from 'debug';

import webpackFrontendConfig from '../../../config/webpack.frontend';

const debug = debugLib('starter-kit:hmrListener');

export default class HMRListener {
  constructor() {
    this.io = null;
    this.compiler = null;
    this.stats = null;
  }

  listen(server) {
    debug('Listening to Webpack HMR updates');

    this.io = new Io(server, {'log level': 1});
    this.io.on('connection', socket => {
      socket.emit('hot');
      if(this.stats) {
        sendStats(this.io.sockets, this.stats, {force: true});
      }
    });

    this.compiler = webpack(webpackFrontendConfig);
    this.compiler.plugin('compile', invalid);
    this.compiler.plugin('invalid', invalid);
    this.compiler.plugin('done', stats => {
      if(this.io) {
        this.stats = stats;
        sendStats(this.io.sockets, this.stats);
      }
    });
  }

  close() {
    if(this.io) {
      debug('Stopping Webpack HMR updates');
      this.io.close();
      this.stats = null;
      this.io = null;
      this.compiler = null;
    }
  }
}

function invalid() {
  if(this.io) {
    this.io.emit('invalid');
  }
}

function sendStats(sockets, stats, options = {}) {
  let emitted = (asset) => {
    return !asset.emitted;
  };

  if(!options.force && stats && stats.assets.every(emitted)) {
    return sockets.emit('still-ok');
  }

  sockets.emit('hash', stats.hash);

  if(stats.errors.length > 0) {
    return sockets.emit('error', stats.errors);
  }

  if(stats.warnings.length > 0) {
    return sockets.emit('warnings', stats.warnings);
  }

  sockets.emit('ok');
}
