import React from 'react'
import PropTypes from 'prop-types'
import Overlay from './overlay'


class PluggableWidget extends React.Component {

  render () {
    const { widget, plugins, editable, onEdit, onDelete } = this.props
    const plugin = plugins.find(p => p.kind === widget.kind)

    return editable ? (
      <Overlay
        onEdit={() => onEdit && onEdit(widget)}
        onDelete={() => onDelete && onDelete(widget)}
      >
        <plugin.component widget={widget} />
      </Overlay>
    ) : (
      <plugin.component widget={widget} />
    )
  }
}

PluggableWidget.propTypes = {
  widget: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired,
  editable: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default PluggableWidget