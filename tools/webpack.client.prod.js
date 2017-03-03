const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const CONFIG = require('./webpack.base')
const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG

const autoprefixer = require('autoprefixer')

module.exports = {
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
  devtool: false,
  entry: {
    main: [CLIENT_ENTRY],
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
      'superagent',
      'slate-editor'
    ]
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT
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
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor_[hash].js'}),
    new AssetsPlugin({ filename: 'assets.json' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        join_vars: true,
        if_return: true
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin({filename: '[name].css', allChunks: true})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
                discardComments: {
                  removeAll: true
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|otf.*|eot.*|ttf.*|woff.*|woff2.*)$/,
        use: 'file-loader?name=[path][sha512:hash:base64:7].[ext]'
      },
      { test: /\.svg/, use: 'svg-url-loader' }
    ]
  }
}
