// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { showMobilizationPublicView, getDomain } from '~routes/utils'
import serverConfig from '~server/config'

export default store => ({
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      if (showMobilizationPublicView(getDomain(store, serverConfig))) {
        cb(null, [
          require('./custom-domain').default(store)
        ])
      } else {
        cb(null, [
          require('./admin').default(store)
        ])
      }
    })
  }
})
