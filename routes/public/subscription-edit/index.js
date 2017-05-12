// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~client/store'

//
// @path (public) /subscriptions/:id/edit
//
export default store => ({
  path: 'subscriptions/:id/edit',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'subscriptions', require('~client/subscriptions/redux/reducers').default)
      callback(null, require('./page.connected').default)
    })
  }
})
