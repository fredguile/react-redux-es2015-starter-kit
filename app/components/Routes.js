import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Application from './Application';
import Homepage from './Homepage';
import AnotherPage from './AnotherPage';

export default (
  <Route path="/" component={Application}>
    <IndexRoute component={Homepage} />
    <Route path="page2" component={AnotherPage} />
  </Route>
);
