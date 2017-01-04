export const getCurrent = (state, ownProps) => {
  const { current, data } = state.mobilization
  return data.filter(mob => mob.id === current)[0]
}

export const getList = (state, ownProps) => {
  return state.mobilization.data
}

export const getMenuActiveIndex = (state, ownProps) => {
  return state.mobilization.menuActiveIndex
}

export const isLoaded = (state, ownProps) => {
  return state.mobilization.isLoaded
}
