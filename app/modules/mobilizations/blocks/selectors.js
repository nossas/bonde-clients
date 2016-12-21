export const getWidgets = ({ widgets, block }) => widgets.data.filter(
  widget => widget.block_id === block.id
)
