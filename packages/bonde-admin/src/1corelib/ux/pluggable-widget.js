import React from 'react'
import PropTypes from 'prop-types'


class PluggableWidget extends React.Component {

  render () {
    const { widget, plugins } = this.props
    const plugin = plugins.find(p => p.kind === widget.kind)

    return (
      <plugin.component widget={widget} />
    )
  }
}

PluggableWidget.propTypes = {
  widget: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired
}

export default PluggableWidget