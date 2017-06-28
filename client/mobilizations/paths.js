import DefaultConfigServer from '~server/config'

export const mobilizations = () => '/mobilizations'
export const mobilization = (mobilization, domain = DefaultConfigServer.appDomain) => {
  if (domain && domain.indexOf('staging') !== -1) {
    return `http://${mobilization.slug}.${domain}`
  }

  return mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
}
export const mobilizationLaunch = id => `/mobilizations/${id}/launch`
export const mobilizationLaunchEnd = id => `/mobilizations/${id}/launch/end`
export const newMobilization = () => '/mobilizations/new'
export const editMobilization = id => `/mobilizations/${id}/edit`
export const basicsMobilization = id => `/mobilizations/${id}/basics`
export const cityMobilization = id => `/mobilizations/${id}/city`
export const cityNewMobilization = id => `/mobilizations/${id}/cityNew`
export const sharingMobilization = id => `/mobilizations/${id}/sharing`
export const analyticsMobilization = id => `/mobilizations/${id}/analytics`
export const metricsMobilization = id => `/mobilizations/${id}/metrics`
export const customDomainMobilization = id => `/mobilizations/${id}/customDomain`
