export const getCurrent = (state, ownProps) => {
  const { params: { mobilization_id } } = ownProps || { params: {} }
  const { list: { currentId, data } } = state.mobilization
  return data.filter(mob => mob.id === currentId || mobilization_id)[0]
}

export const getList = state => state.mobilization.list.data

export const getBlocks = state => state.blocks.data

export const blocksIsLoaded = state => state.blocks.loaded

export const getMenuActiveIndex = state => state.mobilization.list.menuActiveIndex

export const isLoading = state => state.mobilization.list.loading

export const isLoaded = state => state.mobilization.list.isLoaded
