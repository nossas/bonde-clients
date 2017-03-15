// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
// import { injectAsyncReducer } from '~client/store'
// import { showMobilizationPublicView, getDomain } from '~routes/utils'
import { UserIsLogged } from '~routes/utils'

export default store => ({
  path: '/',

  indexRoute: {
    onEnter: UserIsLogged(store)
  },

  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./container').default)
    })
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./not-authenticated').default(store),
        require('./authenticated').default(store)
      ])
    })
  }
})
