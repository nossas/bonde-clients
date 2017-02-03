// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~common/store'

export default store => ({
  path: '/',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'mobilizations', require('~mobilizations/reducers').default)
      callback(null, require('./container.connected').default)
    })
  },
  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./mobilizations/list/page.connected').default
      })
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./mobilizations').default(store),

        require('~common/routes/not-found').default
      ])
    })
  }
})
