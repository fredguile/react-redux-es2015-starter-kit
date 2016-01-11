import React from 'react';
import {match, RoutingContext} from 'react-router';
import {promisify} from 'bluebird';
import serialize from 'serialize-javascript';
import {Provider} from 'react-redux';
import debugLib from 'debug';

import Routes from '../../components/Routes';
import getInitialState from './initialState';
import configureStore from './configureStore';
import {reactToStringAsync, reactToStaticMarkupAsync} from './renderAsync';
import Document from '../../components/Document';
import {html} from './httpResponses';
import webpackFrontendConfig from '../../../config/webpack.frontend';

const debug = debugLib('starter-kit:addRoutes');
const matchAsync = promisify(match, {multiArgs: true});

export default function addRoutes(app, config) {
  app.get('/*', (req, res, next) => isomorphicRoute(config, req, res, next));
}

function isomorphicRoute(config, req, res, next) {
  const {url} = req;
  const {output: {publicPath}} = webpackFrontendConfig;

  const initialState = getInitialState(config);
  const store = configureStore(initialState);

  debug(`Fetching isomorphic route for URL ${url}`);

  return matchAsync({routes: Routes, location: url})
    .then(([redirectLocation, renderProps]) => {
      // redirect
      if(redirectLocation) {
        const {basename, pathname, search} = redirectLocation;
        return res.redirect(302, basename + pathname + search);
      }

      // not found
      if(!renderProps) {
        return next();
      }

      // isomorphic route
      return reactToStringAsync(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      ).then(content => reactToStaticMarkupAsync(
        <Document
          publicPath={publicPath}
          content={content}
          initialState={'window.__INITIAL_STATE__ =' + serialize(initialState)}
        />
      )).then(content => html(res, content))
    })
    .catch(err => next(err));
}
