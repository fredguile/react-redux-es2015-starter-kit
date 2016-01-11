import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Application from './Application';
import Homepage from './Homepage';
import TodoPage from '../modules/todoList/TodoPage';

export default (
  <Route path="/" component={Application}>
    <IndexRoute component={Homepage} />
    <Route path="todoList" component={TodoPage} />
  </Route>
);
