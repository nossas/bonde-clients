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

export function configMobilization(id) {
  return `/mobilizations/${id}/config`
}

export function newMobilizationBlock(mobilization_id) {
  return `/mobilizations/${mobilization_id}/blocks/new`
}
