import AccountSelectors from '~client/account/redux/selectors'
import * as CommunitySelectors from '~client/community/selectors'
import * as Paths from '~client/paths'

export const showMobilizationPublicView = ({ host, domain }) => {
  return (isSubdomain(host, domain) || !isDomain(host, domain))
}

// eslint-disable-next-line
export const isSubdomain = (host, domain) => host.match(`(.+)\.${domain}`)
export const isDomain = (host, domain) => host.match(domain)

export const getDomain = (store, serverConfig) => {
  const { sourceRequest: { host } } = store.getState()
  const domain = serverConfig.appDomain
  return { domain, host }
}

export const UserIsLogged = (store) => (nextState, replace) => {
  const user = AccountSelectors(store.getState()).getUser()
  if (!user) {
    replace(Paths.login())
  } else if (!CommunitySelectors.getCurrent(store.getState())) {
    replace(Paths.list())
  } else {
    replace(Paths.mobilizations())
  }
}
