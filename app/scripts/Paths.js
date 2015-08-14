export function mobilization(id) {
  return `/mobilizations/${id}`
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
