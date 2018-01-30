import React from 'react'
import PropTypes from 'prop-types'
import Block from './block'
import Widget from './widget'


export const createPage = ({ plugins, relationship }) => {

  class WebPage extends React.Component {

    getPluginConfig (kind) {
      // TODO: fazer checagem das propriedades
      const config = plugins.filter(opts => opts.kind === kind)[0] 
      
      if (!config)
        throw new Error(`Plugin[${kind}] configuration not exists.`)
      else if (Object.keys(config).findIndex(k => k === 'component') === -1)
        throw new Error(`Plugin[${kind}]: component key isnt configured.`)
      
      return {
        component: config.component,
        renderOverlay: config.renderOverlay
      }
    }

    renderBlock (block) {
      const widgets = relationship(block, this.props.widgets)

      return (
        <Block key={`block-${block.id}`} block={block}>
          {widgets.map(widget => (
            <Widget
              key={`widget-${widget.id}`}
              widget={widget}
              readOnly={this.props.readOnly}
              {...this.getPluginConfig(widget.kind)}
            />
          ))}
        </Block>
      )
    }
  
    render () {
      return (
        <div className='webpage'>
          {this.props.blocks.map(this.renderBlock.bind(this))}
        </div>
      )
    }
  }

  WebPage.propTypes = {
    readOnly: PropTypes.bool
  }

  WebPage.defaultProps = {
    readOnly: true
  }

  return WebPage
}
