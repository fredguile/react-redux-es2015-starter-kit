# react-redux-es2015-starter-kit
My own starter kit for making a React/Redux web application using Webpack and ES2015.
Feel free to fork this repo to start your own project.

### Features: 

- Written in ECMAScript 2015, transpiled by [Babel 6](https://babeljs.io/). 
- Compiled using [Webpack](http://webpack.github.io/) for both server and client-side code.
- Generating sourcemaps for backend & client code during development.
- Using my own cluster management library [cluster-respawn](https://www.npmjs.com/package/cluster-respawn).
- [React](http://facebook.github.io/react/) with server side rendering on [expressjs](http://expressjs.com/) backend.
- [React-router](https://github.com/rackt/react-router) for isomorphic routing.
- [Redux](http://rackt.github.io/redux/) [Flux](https://facebook.github.io/flux/) with atomic [immutable.js](http://facebook.github.io/immutable-js) app state.
- Hot reloading of client modules and reducers using [React-Hot-Loader](https://github.com/gaearon/react-hot-loader).
- Shared cluster configuration managed by [Shared-Store](https://github.com/groupon/shared-store).
- [Bootstrap](http://getbootstrap.com/) integration for styling.
- [Eslint](http://eslint.org/) integration.
- Server auto restart, or restart-on-demand using "make reload". 

### Quick Start

This starter kit has been optimized for Node 4.x and NPM 3.x. Of course, you can run it with Node 5.x.

```bash

git clone https://github.com/fredguile/react-redux-es2015-starter-kit.git
cd react-redux-es2015-starter-kit
make setup
make dev


```

Open it in your browser [http://localhost:3000](http://localhost:3000).

### File Structure

My proposed app structure as following:

```
react-redux-es2015-starter-kit/
 ├──app/                       * project files
 │   ├──components/            * some React components as example
 │   │
 │   ├──core/                  * default app behavior
 │   │   ├──bootstrap.js       * master & workers processes initialization script
 │   │   └──frontend/          * client-side bootstrap code & main CSS
 │   │
 │   ├──modules/               * proposed folder for app modules
 │       └──todoList/              * our infamous todo example using Redux
 │
 ├──build/                     * webpack build for backend code (optimized for Node 4.x)
 │
 ├──config/                    * configuration files
 │
 ├──public/                    * static files served by Express
 │
 ├──tasks/                     * Gulp tasks for building project and starting server
 │
 ├──tmp/                       * Temperary copy of the shared configuration
 │
 ├──index.js                   * Node start script
 ├──Makefile                   * For managing server lifecycle using make commands
 │
 ├──master.pid                 * Master PID file (when server is started)
 ├──worker-X.pid               * Workers PID file (when server is started)
 │
 └──package.json               * npm configuration
```
