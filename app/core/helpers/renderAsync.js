import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Promise from 'bluebird';
import HRDuration from 'hrduration';
import debugLib from 'debug';

const debug = debugLib('starter-kit:renderAsync');

export const reactToStringAsync = ReactComponent => timedPromise(
  renderToString,
  'rendered react component'
)(ReactComponent);

export const reactToStaticMarkupAsync = ReactComponent => timedPromise(
  renderToStaticMarkup,
  'rendered react component to static markup'
)(ReactComponent);


function timedPromise(method, message) {
  return function(...args) {
    const timer = new HRDuration();

    return Promise.try(method.bind(this, ...args))
      .finally(() => {
        const duration = timer.getSeconds();
        debug(`${message} (${duration}s)`);
      });
  };
};
