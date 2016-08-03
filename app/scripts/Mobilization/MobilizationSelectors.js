
export const getObjectsStateToProps = (globalState) => {
  const { mobilization: { objects } } = globalState
  return objects
}

export const getFormsStateToProps = (globalState, reduxMountPoint) => {
  const { mobilization: { forms } } = globalState
  return forms[reduxMountPoint]
}

export const getMobilization = (globalState, props) => {
  const { mobilization: { data } } = globalState
  let { params: { mobilization_id } } = props
  if (typeof mobilization_id === 'string') {
    mobilization_id = parseInt(mobilization_id)
  }
  return data.filter(mob => mob.id === mobilization_id)[0]
}
