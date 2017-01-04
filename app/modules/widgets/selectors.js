export const getWidget = (state, props) => {
  const { params: { widget_id } } = props
  return state.widgets.list.data.filter(widget => widget.id === parseInt(widget_id))[0]
}

export const isLoaded = state => state.widgets.list.loaded
