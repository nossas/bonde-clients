// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./custom-domain').default(store),
        require('./subscription-edit').default(store)
      ])
    })
  }
})
