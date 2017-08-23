const namespace = '/community'

export const communityAdd = () => `${namespace}/new`
export const communityDomain = () => `${namespace}/domain`
export const communityDomainCreate = next => `${namespace}/domain/add${next || ''}`
export const communityDomainEdit = domain => `${namespace}/domain/${domain.id}/edit`
export const communityInfo = () => `${namespace}/info`
export const communityInvite = () => `${namespace}/invite`
export const communityList = () => namespace
export const communityMailchimp = () => `${namespace}/mailchimp`
export const communityRecipient = () => `${namespace}/recipient`
export const communityReport = () => `${namespace}/report`
export const communityTwilio = () => `${namespace}/twilio`
