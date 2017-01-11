export const getWidget = (state, props) => {
  const { params: { widget_id } } = props
  return getWidgets(state).filter(widget => widget.id === parseInt(widget_id))[0]
}

export const getWidgets = state => state.widgets.list.data

export const getBlockWidgets = ({ widgets, block }) => widgets.filter(
  widget => widget.block_id === block.id
)

export const isLoaded = state => state.widgets.list.loaded
