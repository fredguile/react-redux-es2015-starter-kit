import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import {chain, reduce} from 'lodash';

if(!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV!');
}

// for webpack "externals", let's map x to "commonjs x" using a reducer
const externalsReducer = (acc, ref) => { acc[ref] = `commonjs ${ref}`; return acc; };

// references that we manually put in the externals
const manualExternals = reduce([
  'shared-store/file',
  'gofer/hub',
  'react-dom/server',
], externalsReducer, {});

// For server-side code, our externals are node_modules + the above manual references
// Why? I noticed that Webpack isn't smart when importing "this/that" even if it's in node_modules
const externals =
  chain(fs.readdirSync(path.resolve(__dirname, '../node_modules')))
    .filter(mod => mod !== '.bin')
    .reduce(externalsReducer, manualExternals)
    .value();

const backendConfig = {
  target: 'node',
  entry: ['./app/core/worker.js'],
  output: {
    path: path.resolve(__dirname, '../build')
  },
  externals,
  node: {
    console: true,
    global: true,
    process: true,
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?cacheDirectory&presets[]=es2015-node4&presets[]=react&presets[]=async-to-bluebird'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: []
};

if(process.env.NODE_ENV === 'development') {
  backendConfig.entry.push('./config/development.json');
  backendConfig.output.filename = 'backend.dev.js';
  backendConfig.debug = true;
  backendConfig.devtool = '#source-map';
}
else {
  backendConfig.output.filename = 'backend.js';
  backendConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

export default backendConfig;
