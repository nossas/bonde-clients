const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
// const DashboardPlugin = require('webpack-dashboard/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const sourcePath = path.join(__dirname, './../client/')
const staticsPath = path.join(__dirname, './../public/')

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'production',
    API_URL: JSON.stringify(process.env.API_URL),
    APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
    PAGARME_KEY: JSON.stringify(process.env.PAGARME_KEY),
    GOOGLE_FONTS_API_KEY: JSON.stringify(process.env.GOOGLE_FONTS_API_KEY),
    '__DEV__': true

  }),
  new webpack.NamedModulesPlugin(),
  new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
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
      if_return: true,
      join_vars: true
    },
    output: {
      comments: false
    }
  })
]

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
  context: sourcePath,
  entry: {
    main: './index.js',
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
      // 'font-awesome',
      // 'xlsx',
      'superagent'
    ]
  },
  output: {
    path: staticsPath,
    filename: '[name].bundle.js',
    publicPath: '/'
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/assets'
        })
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
                { loader: 'css-loader', query: { modules: false, sourceMaps: true } },
                { loader: 'postcss-loader' },
                { loader: 'sass-loader', query: { sourceMaps: true } }
          ]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|server)/,
        use: [
          'babel-loader'
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

  plugins,

  performance: {
    maxAssetSize: 100,
    maxEntrypointSize: 300,
    hints: 'warning'
  },

  stats: {
    colors: {
      green: '\u001b[32m'
    }
  },

  devServer: {
    contentBase: './client',
    historyApiFallback: true,
    port: 3000,
    compress: true,
    inline: false,
    hot: false,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      errorDetails: true,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  }
}

// const webpack = require('webpack')
// const fs = require('fs')
// const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
//
// const CONFIG = require('./webpack.base')
// const { SERVER_ENTRY, SERVER_OUTPUT, PUBLIC_PATH } = CONFIG
//
// const autoprefixer = require('autoprefixer')
//
// function getExternals () {
//   const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'))
//   return nodeModules.reduce(function (ext, mod) {
//     ext[mod] = 'commonjs ' + mod
//     return ext
//   }, {})
// }
//
// module.exports = {
//   target: 'node',
//   devtool: 'inline-source-map',
//   entry: SERVER_ENTRY,
//   output: {
//     path: SERVER_OUTPUT,
//     filename: 'server.js'
//   },
//   externals: [
//     {'./cptable': 'var cptable'},
//     getExternals()
//   ],
//   node: {
//     fs: 'empty',
//     __filename: true,
//     __dirname: true
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel-loader'
//       },
//       {
//         test: /\.(scss|sass)$/,
//         use: ExtractTextPlugin.extract({
//           use: [
//             'style-loader',
//             'css-loader?sourceMap',
//             {
//               loader: 'postcss-loader',
//               options: {
//                 plugins: function () {
//                   return [
//                     autoprefixer()
//                   ]
//                 }
//               }
//             },
//             'sass-loader?sourceMap'
//           ]
//         })
//       },
//       {
//         test: /\.(png|otf.*|eot.*|ttf.*|woff.*|woff2.*)$/,
//         use: 'file-loader?name=[path][sha512:hash:base64:7].[ext]'
//       },
//       { test: /\.svg/, use: 'svg-url-loader' }
//     ]
//   },
//   plugins: [
//     new webpack.IgnorePlugin(/\.(css|scss|svg|jpe?g|png)$/),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: false,
//       mangle: false,
//       compress: {
//         warnings: false
//       }
//     }),
//     new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
//   ]
// }
