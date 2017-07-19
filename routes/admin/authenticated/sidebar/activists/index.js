// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  path: 'activists',

  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./container.connected').default)
    })
  },
  
  /*
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./info').default(store),
        require('./invite').default(store),
        require('./mailchimp').default(store),
        require('./recipient').default(store),
        require('./report').default(store),

        require('./domain').default(store),
        require('./domain-create').default(store)
      ])
    })
  }
  */
})
