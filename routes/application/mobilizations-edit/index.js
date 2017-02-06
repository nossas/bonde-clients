// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~common/store'

const RoutesMobilizations = store => ({
  path: 'mobilizations/:mobilization_id/edit',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      injectAsyncReducer(store, 'blocks', require('~mobilizations/blocks/reducers').default)
      injectAsyncReducer(store, 'widgets', require('~mobilizations/widgets/reducers').default)
      callback(null, require('./page.connected').default)
    })
  }
})

export default RoutesMobilizations
