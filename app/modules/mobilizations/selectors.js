export const getCurrent = (state, ownProps) => {
  const { currentId, data } = state.mobilization
  return data.filter(mob => mob.id === currentId)[0]
}

export const getList = (state, ownProps) => state.mobilization.data

export const getBlocks = (state, ownProps) => state.blocks.data

export const getWidgets = (state, ownProps) => state.widgets.data

export const getMenuActiveIndex = (state, ownProps) => {
  return state.mobilization.menuActiveIndex
}

export const isLoaded = (state, ownProps) => {
  return state.mobilization.isLoaded
}
