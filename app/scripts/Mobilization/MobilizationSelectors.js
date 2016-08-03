
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
  const { params: { mobilization_id } } = props
  return data.filter(mob => mob.id === props.params.mobilization_id)[0]
}
