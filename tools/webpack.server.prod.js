const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const CONFIG = require('./webpack.base')
const { SERVER_ENTRY, SERVER_OUTPUT, PUBLIC_PATH } = CONFIG

const autoprefixer = require('autoprefixer')

function getExternals () {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'))
  return nodeModules.reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {})
}

module.exports = {
  target: 'node',
  devtool: 'inline-source-map',
  entry: SERVER_ENTRY,
  output: {
    path: SERVER_OUTPUT,
    filename: 'server.js'
  },
  externals: [
    {'./cptable': 'var cptable'},
    getExternals()
  ],
  node: {
    fs: 'empty',
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          use: [
            'style-loader',
            'css-loader?sourceMap',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    autoprefixer()
                  ]
                }
              }
            },
            'sass-loader?sourceMap'
          ]
        })
      },
      {
        test: /\.(png|otf.*|eot.*|ttf.*|woff.*|woff2.*)$/,
        use: 'file-loader?name=[path][sha512:hash:base64:7].[ext]'
      },
      { test: /\.svg/, use: 'svg-url-loader' }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|scss|svg|jpe?g|png)$/),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
  ]
}
