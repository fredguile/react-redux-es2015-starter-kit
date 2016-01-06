import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

if(!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV!');
}

// TODO: for production, optimize the JS output file by shimming vendor libs with their minified versions

const frontendConfig = {
  entry: [
    './core/frontend/main.styl',
    './core/frontend/bootstrap.js'
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, '../public/dist'),
    publicPath: '/public/dist/',
    pathinfo: true
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}'
  },
  node: {
    console: true,
    process: true,
    http: true,
    https: true,
    util: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel?cacheDirectory&presets[]=es2015&presets[]=react'] // why an array? see below
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.png$/,
        loader: 'file?name=[name]-[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true)
      }
    }),
    new webpack.PrefetchPlugin('react')
  ]
};

if(process.env.NODE_ENV === 'development') {
  frontendConfig.output.filename = '[name].bundle.dev.js';
  frontendConfig.output.chunkFilename = '[id].chunk.dev.js';
  frontendConfig.output.publicPath = '/webpack/'; // no matter what's output.path, Webpack uses memoryFS in development

  // Extract all CSS with sourcemap
  frontendConfig.module.loaders.push(
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css', 'css?sourceMap')
    },
    {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract('stylus', 'css?sourceMap!stylus')
    }
  );
  frontendConfig.plugins.unshift(new ExtractTextPlugin('[name].bundle.dev.css', {allChunks: true}));

  // enable sourcemaps in browser
  frontendConfig.debug = true;
  frontendConfig.devtool = '#source-map';

  // add Webpack HMR
  frontendConfig.entry.unshift('webpack-hot-middleware/client?reload=true');
  frontendConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // add React Hot Loader
  frontendConfig.module.loaders[0].loaders.unshift('react-hot');

  // add noErrors plugin
  frontendConfig.plugins.push(new webpack.NoErrorsPlugin());
}
else {
   // Extract all CSS without sourcemap
  frontendConfig.module.loaders.push(
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css', 'css')
    },
    {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract('stylus', 'css!stylus')
    }
  );
  frontendConfig.plugins.unshift(new ExtractTextPlugin('[name].bundle.css', {allChunks: true}));

  // add Occurence order plugin to optimize file size
  frontendConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());

  // Minify JS
  frontendConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

export default frontendConfig;
