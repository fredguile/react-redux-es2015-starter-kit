import fs from 'fs';
import path from 'path';
import {promisifyAll, reject} from 'bluebird';
import debugLib from 'debug';

import configStore from '../configStore';

if(!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV!');
}

const debug = debugLib('starter-kit:initializer:config');

const initialConfig = {
  server: {
    root: process.cwd(),
    env: process.env.NODE_ENV
  }
};

promisifyAll(fs);

export default function initConfig() {
  const filename = `config/${initialConfig.server.env}.json`;
  const filepath = path.resolve(initialConfig.server.root, filename);

  return fs.statAsync(filepath)
    .then(stats => {
      if(stats.isFile()) {
        debug(`reading config from ${filename}`);
        return configStore.init({filename});
      }

      return reject(new Error(`could not find config ${filename}`));
    });
}
