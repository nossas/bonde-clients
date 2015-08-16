export function mobilizations(id) {
  return `/mobilizations`
}

export function mobilization(id) {
  return `/mobilizations/${id}`
}

export function newMobilization() {
  return `/mobilizations/new`
}

export function editMobilization(id) {
  return `/mobilizations/${id}/edit`
}

export function basicsConfigMobilization(id) {
  return `/mobilizations/${id}/config/basics`
}

export function cityConfigMobilization(id) {
  return `/mobilizations/${id}/config/city`
}

export function analyticsConfigMobilization(id) {
  return `/mobilizations/${id}/config/analytics`
}

export function newMobilizationBlock(mobilization_id) {
  return `/mobilizations/${mobilization_id}/blocks/new`
}
