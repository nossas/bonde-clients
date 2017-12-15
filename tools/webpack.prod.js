const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const common = require('./webpack.common.js')

module.exports = merge.smart(common, {
  output: {
    publicPath: `https://s3-sa-east-1.amazonaws.com/${process.env.AWS_BUCKET}/`
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new CompressionPlugin({
      asset: '[path][query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$$/,
      minRatio: 0.8
    }),
    new HtmlWebpackPlugin({
      template: '../tools/index.template.ejs',
      inject: 'body'
    }),
    new Visualizer({
      filename: './build/main.stats.html'
    })
  ]
})
