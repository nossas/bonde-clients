export const getWidget = (state, props) => {
  const { params: { widget_id } } = props
  return getWidgetList(state).filter(widget => widget.id === parseInt(widget_id))[0]
}

export const getWidgetList = state => state.widgets.list.data

export const isLoaded = state => state.widgets.list.loaded
