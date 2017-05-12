// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~client/store'

//
// @path (admin) /login
//
export default store => ({
  path: 'login',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'auth', require('~client/account/redux/reducers').default)
      callback(null, require('./page.connected').default)
    })
  }
})
