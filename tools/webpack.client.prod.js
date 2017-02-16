const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const CONFIG = require('./webpack.base')
const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG

const inlinesvg = require('postcss-inline-svg')
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: false,
  entry: {
    main: [CLIENT_ENTRY],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'aphrodite'
    ]
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT
  },
  postcss: function () {
    return [autoprefixer, inlinesvg]
  },
  sassLoader: {
    includePaths: [path.join(__dirname, '.scss')]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
        APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
        PAGARME_KEY: JSON.stringify(process.env.PAGARME_KEY),
        GOOGLE_FONTS_API_KEY: JSON.stringify(process.env.GOOGLE_FONTS_API_KEY),
        '__DEV__': false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor_[hash].js', 2),
    new AssetsPlugin({ filename: 'assets.json' }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0', 'react-optimize']
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap', 'postcss-loader?parser=postcss-scss', 'sass-loader?sourceMap'])
      },
      {
        test: /\.(png|otf.*|eot.*|ttf.*|woff.*|woff2.*)$/,
        loader: 'file?name=[path][sha512:hash:base64:7].[ext]'
      },
      { test: /\.svg/, loader: 'svg-url' }

    ]
  }
}
