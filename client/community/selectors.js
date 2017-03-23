export const getList = state => state.community.data
export const getCurrentId = state => state.community.currentId
export const isLoaded = state => state.community.isLoaded
export const isLoading = state => state.community.loading

export const getCurrent = state => getList(state).filter(c => c.id === getCurrentId(state))[0]
