var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'scripts', 'index.jsx');
var autoprefixer = require('autoprefixer-core');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    mainPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [nodeModulesPath],
      loader: 'babel'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass!postcss'
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }, {
      test: /\.(json)$/,
      loader: 'json'
    }, {
      test: /\.(woff.*|eot.*|ttf.*|svg.*)$/,
      loader: 'url?limit=100000'
    }]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 version'] }) ],
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        'BASE_URL': '"http://localhost:3000"',
        'GOOGLE_ANALYTICS_CODE': '"FAKE_GA_CODE"'
      },
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false
    })
  ]
};
