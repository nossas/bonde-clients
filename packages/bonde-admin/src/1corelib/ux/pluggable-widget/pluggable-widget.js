import React from 'react'
import PropTypes from 'prop-types'
import Overlay from './overlay'


class PluggableWidget extends React.Component {

  getExtraProps () {
    // TODO: Essas propriedades devem ser repensadas
    return {
      mobilization: this.props.mobilization || {
        header_font: 'meu-rio',
        body_font: 'meu-rio'
      },
      editable: this.props.editable,
      // TODO: Propriedades requeridas para edição de conteúdo, sai do padrão
      // overlay
      onEdit: () => {},
      onCancelEdit: () => {}
    }
  }

  getOptions (plugin) {
    let options = { noOverlay: !this.props.editable }
    if (typeof plugin.options === 'function') {
      options = Object.assign({}, options, plugin.options(this.props))
    } else if (typeof plugin.options === 'object') {
      options = Object.assign({}, options, plugin.options)
    }
    return options
  }

  render () {
    const { widget, plugins, onEdit, onDelete } = this.props
    
    const plugin = plugins.find(p => p.kind === widget.kind)
    const { noOverlay } = this.getOptions(plugin)

    return !noOverlay ? (
      <Overlay
        onEdit={() => onEdit && onEdit(widget)}
        onDelete={() => onDelete && onDelete(widget)}
      >
        <plugin.component widget={widget} plugins={plugins} {...this.getExtraProps()} />
      </Overlay>
    ) : (
      <plugin.component widget={widget} plugins={plugins} {...this.getExtraProps()} />
    )
  }
}

PluggableWidget.defaultProps = {
  editable: false
}

PluggableWidget.propTypes = {
  widget: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired,
  editable: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default PluggableWidget