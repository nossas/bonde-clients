import { injectAsyncReducer } from '~client/store'

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /bot
//
export default store => ({
  path: 'bot',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      // injectAsyncReducer(store, 'community', require('~client/community/reducers').default)
      // callback(null, require('./page.connected').default)
      callback(null, require('./page.connected').default)
    })
  }
})
