import React from 'react';
import {Provider} from 'react-redux';
import Router from 'react-router';
import {createHistory} from 'history';
import {syncReduxAndRouter} from 'redux-simple-router';
import {render} from 'react-dom';
import debugLib from 'debug';

import Routes from '../../components/Routes';
import configureStore from '../helpers/configureStore';

const debug = debugLib('starter-kit:client');

debugLib.enable('starter-kit:client');

document.addEventListener('DOMContentLoaded', () => {
  debug('It\'s time to mount components on client again... open up React Developer Tools to see the result!');

  // rehydrate store's state
  const initialState = window.__INITIAL_STATE__;
  const store = configureStore(initialState);

  // create browser history & sync it with the store
  const history = createHistory();
  syncReduxAndRouter(history, store);

  render(
    <Provider store={store}>
      <Router history={history}>
        {Routes}
      </Router>
    </Provider>,
    document.getElementById('app')
  );

  delete window.__INITIAL_STATE__;
});
