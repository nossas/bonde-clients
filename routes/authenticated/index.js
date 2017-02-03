// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

const RoutesMobilizations = store => ({
  path: '/',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./mobilizations').default
      ])
    })
  }
})

export default RoutesMobilizations
