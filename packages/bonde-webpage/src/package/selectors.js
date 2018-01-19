import { createSelector } from 'reselect'

export default (reducerName) => {
  
  const mobilizationSelector = state => {
    const mobilizations = state[reducerName].mobilizations.data
    if (mobilizations.length === 1) {
      return mobilizations[0]
    }
  }
  const blocksSelector = state => state[reducerName].blocks.data
  const widgetsSelector = state => state[reducerName].widgets.data

  return {
    mobilizationSelector: createSelector(
      mobilizationSelector,
      blocksSelector,
      widgetsSelector,
      (mobilization, blocks, widgets) => mobilization ? {
        ...mobilization,
        blocks,
        widgets
      } : undefined
    )
  }
}
