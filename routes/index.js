// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { showMobilizationPublicView, getDomain } from '~routes/utils'
import serverConfig from '~server/config'

const whitelistedPublicRoutes = [
  '/subscription/edit'
]

export default store => ({
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      const { sourceRequest: { url } } = store.getState()
      const isPublicView = showMobilizationPublicView(getDomain(store, serverConfig))
      const isPublicWhitelisted = whitelistedPublicRoutes.includes(url.pathname)

      if (isPublicView || isPublicWhitelisted) {
        cb(null, [
          require('./public').default(store)
        ])
      } else {
        cb(null, [
          require('./admin').default(store)
        ])
      }
    })
  }
})
