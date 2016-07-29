

export const getObjectsStateToProps = (globalState) => {
  const { mobilization: { objects } } = globalState
  return objects
}

export const getFormsStateToProps = (globalState, reduxMountPoint) => {
  const { mobilization: { forms } } = globalState
  return forms[reduxMountPoint]
}
