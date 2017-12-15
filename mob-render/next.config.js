const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')
const { ANALYZE } = process.env

module.exports = {
  webpack: (config, { dev }) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    config.plugins.push(new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    }))

    config.module.rules.push(
      {
        test: /\.css$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        // Simplest example (non-minified)..
        loader: `babel-loader!next-style-loader`
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|wysihtml-toolbar.min)/
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000, // Convert images < 10k to base64 strings
            name: 'assets/images/[name].[ext]'
          }
        }]
      }
    )
    return config
  }
}
