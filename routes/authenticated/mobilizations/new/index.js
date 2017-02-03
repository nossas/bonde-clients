// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default store => ({
  path: 'new',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./page').default)
    })
  }
  // getIndexRoute (location, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, {
  //       component: require('./page.connected').default
  //     })
  //   })
  // },
  // getChildRoutes (location, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       require('~common/routes/login').default,
  //       require('~common/routes/not-found').default,
  //       { path: 'mobilizations', component: Mobilizations }
  //     ])
  //   })
  // }
})
