var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'scripts', 'index.jsx');
var autoprefixer = require('autoprefixer-core');

module.exports = {
  devtool: 'source-map',
  entry: mainPath,
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
      test: /\.(woff.*|eot.*|ttf.*|svg.*)$/,
      loader: 'url?limit=100000'
    }]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 version'] }) ],
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        'BASE_URL': '"https://hub-api.herokuapp.com"'
      },
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __GOOGLE_ANALYTICS_CODE__: "process.env.GOOGLE_ANALYTICS_CODE"
    })
  ]
};
