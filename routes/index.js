import React from 'react'
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '~common/components/app'
import serverConfig from '~server/config'
import CustomDomain from '~routes/custom-domain'
import { showMobilizationPublicView } from '~routes/utils'

export default function createRoutes (store) {
  const { sourceRequest: { host } } = store.getState()
  const domain = serverConfig.appDomain

  return showMobilizationPublicView({ host, domain }) ? CustomDomain(store) : {
    path: '/',
    component: App,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // require('~common/routes/not-found').default
          require('./mobilizations').default
        ])
      })
    }
  }
}
