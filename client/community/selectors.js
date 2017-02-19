export const getCurrent = (state, ownProps) => {
  const { data, currentId } = state.community
  return data.filter(c => c.id === currentId)[0]
}

export const getCurrentId = state => state.community.currentId
export const getCommunities = state => state.community.data
export const isLoaded = state => state.community.isLoaded
export const isLoading = state => state.community.loading
