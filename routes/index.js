// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import serverConfig from '~server/config'
import CustomDomain from '~routes/custom-domain'
import Authenticated from '~routes/authenticated'
import { showMobilizationPublicView } from '~routes/utils'

export default function createRoutes (store) {
  const { sourceRequest: { host } } = store.getState()
  const domain = serverConfig.appDomain

  return showMobilizationPublicView({ host, domain })
    ? CustomDomain(store)
    : Authenticated(store)
}
