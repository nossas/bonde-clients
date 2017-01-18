export const getWidget = (state, props) => {
  const { params: { widget_id } } = props
  return getList(state).filter(widget => widget.id === parseInt(widget_id))[0]
}

export const getList = state => state.widgets.list.data

export const getBlockWidgets = ({ widgets, block }) => widgets.filter(
  widget => widget.block_id === block.id
)

export const isLoaded = state => state.widgets.list.loaded

export const isLoading = state => state.widgets.list.loading
<<<<<<< HEAD

export const isSaving = state => state.widgets.list.saving
=======
>>>>>>> d93940b3... Merge app structure of branch develop into .old directory #316
