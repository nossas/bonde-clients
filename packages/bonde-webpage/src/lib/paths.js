export const mobilization = (mobilization, domain = process.env.REACT_APP_DOMAIN_PUBLIC) => {
  if (domain && domain.indexOf('staging') !== -1) {
    return `http://${mobilization.slug}.${domain}`
  }

  return mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
}