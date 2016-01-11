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
  const {logging: {morganPattern}, assets: {staticURL}, bodyParser: {limit, parameterLimit}, csrfOptions} = config;

  // log each request
  morgan.token('pid', () => process.pid);
  app.use(morgan(morganPattern));

  // serve assets
  app.use(staticURL, express.static(assetsPath));

  // set cookies in req.cookies
  app.use(cookieParser());

  // Parse form bodies
  app.use(bodyParser.json({
    limit: limit,
    type: ['application/json', 'application/*+json']
  }));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit,
    parameterLimit
  }));

  // CSRF middleware
  app.use(csurf({cookie: csrfOptions}));

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
