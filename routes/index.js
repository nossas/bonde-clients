// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import serverConfig from '~server/config'
import CustomDomain from '~routes/logged-out/custom-domain'
import LoggedIn from '~routes/logged-in'
import { showMobilizationPublicView } from '~routes/utils'

export default store => {
  const { sourceRequest: { host } } = store.getState()
  const domain = serverConfig.appDomain

  return showMobilizationPublicView({ host, domain })
    ? CustomDomain(store)
    : LoggedIn(store)
}
