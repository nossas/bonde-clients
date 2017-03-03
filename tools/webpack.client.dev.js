const path = require('path')
const webpack = require('webpack')
const CONFIG = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { CLIENT_ENTRY, CLIENT_OUTPUT } = CONFIG

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      CLIENT_ENTRY
    ],
    vendor: [
      'react',
      'axios',
      'cpf_cnpj',
      'downloadjs',
      'draft-js',
      'jquery',
      'react-addons-test-utils',
      'react-addons-transition-group',
      'react-color',
      'react-colors-picker',
      'react-cookie',
      'react-document-meta',
      'react-dom',
      'react-ga',
      'react-grid-system',
      'react-helmet',
      'react-redux',
      'react-router',
      'react-s3-uploader',
      'react-test-renderer',
      'redial',
      'redux',
      'redux-form',
      'redux-form-validation',
      'redux-logger',
      'redux-promise',
      'redux-thunk',
      'aphrodite',
      'xlsx',
      'superagent'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: CLIENT_OUTPUT
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|server)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          // Using source maps breaks urls in the CSS loader
          // https://github.com/webpack/css-loader/issues/232
          // This comment solves it, but breaks testing from a local network
          // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
          // 'css-loader?sourceMap',
          'css-loader?importLoaders=1',
          'postcss-loader',
          'sass-loader?sourceMap=true&includePaths[]=' + [
              // Some dependencies might be installed inside the settings directory, this
              // is useful when changes are made to this project locally.
            // path.resolve(__dirname, '../client/'),
            path.resolve(__dirname, '../node_modules/')
          ]
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // Using source maps breaks urls in the CSS loader
          // https://github.com/webpack/css-loader/issues/232
          // This comment solves it, but breaks testing from a local network
          // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
          // 'css-loader?sourceMap',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.otf|woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
      }, // end otf, woff and woff2 test
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?limit=10000&name=assets/fonts/[name].[ext]'
      }, // end ttf , eot and svg test
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 } // Convert images < 10k to base64 strings
        }]
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
  // standard: {
  //   // config options to be passed through to standard e.g.-]
  //   parser: 'babel-eslint'
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
        APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
        PAGARME_KEY: JSON.stringify(process.env.PAGARME_KEY),
        GOOGLE_FONTS_API_KEY: JSON.stringify(process.env.GOOGLE_FONTS_API_KEY),
        '__DEV__': true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor_[hash].js'}),
    new ExtractTextPlugin({filename: '[name].css', allChunks: true})
  ]
}
