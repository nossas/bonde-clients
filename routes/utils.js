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

export const isIndexRedirected = (store) => (nextState, replace) => {
  const credentials = AccountSelectors(store.getState()).getCredentials()

  if (!credentials) {
    UserIsLogged(store)(nextState, replace)
  } else {
    IsCommunitySelected(store)(nextState, replace)
  }
}

export const IsCommunitySelected = (store) => (nextState, replace) => {
  const community = CommunitySelectors.getCurrent(store.getState())
  if (!community) {
    replace(Paths.list())
  }
}

export const UserIsLogged = (store) => (nextState, replace) => {
  const credentials = AccountSelectors(store.getState()).getCredentials()

  if (!credentials) {
    replace(Paths.login())
  }
}
