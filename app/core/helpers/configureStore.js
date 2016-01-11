import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import configureReducers from './configureReducers';

const rootReducer = configureReducers();

export default function configureStore(initialState = {}) {
  const store = applyMiddleware(thunk)(createStore)(rootReducer, initialState);

  // during development, enables HMR for reducers in the browser
  // this code is working, but... does it looks right? :=)
  if(process.env.NODE_ENV === 'development' && process.env.BROWSER && module.hot) {
    module.hot.accept('./configureReducers', updatedDeps => {
      const nextConfigureReducers = __webpack_require__(updatedDeps[module.id]).default;
      store.replaceReducer(nextConfigureReducers());
    });
  }

  return store;
}
