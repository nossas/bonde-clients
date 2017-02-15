// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~common/store'

export default store => ({
  path: 'mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'mobilizations', require('~mobilizations/reducers').default)
      injectAsyncReducer(store, 'widgets', require('~mobilizations/widgets/reducers').default)
      callback(null, require('./page.connected').default)
    })
  }
})
