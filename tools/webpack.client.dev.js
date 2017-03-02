const path = require('path')
const webpack = require('webpack')
const CONFIG = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const autoprefixer = require('autoprefixer')

const { CLIENT_ENTRY, CLIENT_OUTPUT } = CONFIG

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      CLIENT_ENTRY
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'aphrodite',
      'xlsx'
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
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        use: 'standard',
        exclude: /(node_modules)/,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: 'babel',
        exclude: /(node_modules|server)/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          'css-loader?sourceMap',
          'postcss-loader',
        ])
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|otf.*|eot.*|ttf.*|woff.*|woff2.*)$/,
        use: 'file?name=[path][sha512:hash:base64:7].[ext]'
      },
      { test: /\.svg/, use: 'svg-url' }
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
  standard: {
    // config options to be passed through to standard e.g.
    parser: 'babel-eslint'
  },
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
    new webpack.optimize.CommonsChunkPlugin({filename: 'vendor_[hash].js'}),
    new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
    new webpack.NoErrorsPlugin()
  ]
}
