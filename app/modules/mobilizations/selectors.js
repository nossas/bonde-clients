export const getCurrent = (state, ownProps) => {
  const { currentId, data } = state.mobilization.list
  return data.filter(mob => mob.id === currentId)[0]
}

export const getList = state => state.mobilization.list.data

export const getBlocks = state => state.blocks.data

export const blocksIsLoaded = state => state.blocks.loaded

export const getWidgets = state => state.widgets.data

export const getMenuActiveIndex = state => state.mobilization.list.menuActiveIndex

export const isLoading = state => state.mobilization.list.loading

export const isLoaded = state => state.mobilization.list.isLoaded
