import React from 'react'

import { Widget } from '../../../../scripts/components'

const BlockWidgets = ({ widgets, props, state, onChange }) => {
  return <div>
    {widgets.map(widget => (
      <Widget
        {...props}
        key={`widget-${widget.id}`}
        widget={widget}
        onEdit={() => onChange({ editingWidget: true })}
        onCancelEdit={() => onChange({ editingWidget: false })}
      />
    ))}
  </div>
}

export default BlockWidgets
