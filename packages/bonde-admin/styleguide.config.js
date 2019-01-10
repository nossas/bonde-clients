module.exports = {
  webpackConfig: require('./node_modules/react-scripts/config/webpack.config.js'),
  components: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/1corelib/**/*.{js,jsx,ts,tsx}'
  ],
};