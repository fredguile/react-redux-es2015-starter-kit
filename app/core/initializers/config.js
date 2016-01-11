import fs from 'fs';
import path from 'path';
import {promisifyAll, reject} from 'bluebird';
import debugLib from 'debug';

import configStore from '../configStore';

if(!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV!');
}

const debug = debugLib('starter-kit:initializer:config');

promisifyAll(fs);

export default function initConfig() {
  const filename = `config/${process.env.NODE_ENV}.json`;
  const filepath = path.resolve(process.cwd(), filename);

  return fs.statAsync(filepath)
    .then(stats => {
      if(stats.isFile()) {
        debug(`reading config from ${filename}`);
        return configStore.init({filename});
      }

      return reject(new Error(`could not find config ${filename}`));
    });
}
