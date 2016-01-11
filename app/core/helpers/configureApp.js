import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import csurf from 'csurf';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import debugLib from 'debug';
import {inspect} from 'util';

import webpackFrontendConfig from '../../../config/webpack.frontend';
import statsSummary from './statsSummary';
import {error} from './httpResponses';

const debug = debugLib('starter-kit:configureApp');
const assetsPath = path.resolve(__dirname, '../../../public');

export default function configureApp(app, config) {
  // log each request
  app.use(morgan('dev'));

  // serve assets
  app.use('/public', express.static(assetsPath));

  // set cookies in req.cookies
  app.use(cookieParser());

  // Parse form bodies
  app.use(bodyParser.json({
    limit: '1mb', // default: 100kb
    type: ['application/json', 'application/*+json']
  }));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb', // default: 100kb
    parameterLimit: 10000 // default: 1000
  }));

  // CSRF middleware
  app.use(csurf({
    cookie: {path: '/', httpOnly: true}
  }));

  // developers: add Webpack development middleware
  if(process.env.NODE_ENV === 'development') {
    useWebpackDevMiddleware(app);
  }

  // error middleware
  app.use(error);
}

function useWebpackDevMiddleware(app) {
  debug('Booting Webpack dev middleware');

  const compiler = webpack(webpackFrontendConfig);

  compiler.plugin('done', stats => debug(inspect(statsSummary(stats), {depth: 3})));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackFrontendConfig.output.publicPath,
    hot: true,
    quiet: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  }));

  app.use(webpackHotMiddleware(compiler));
}
