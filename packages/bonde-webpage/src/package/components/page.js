import React from 'react'
import Block from './block'
import { createWidget } from './widget'

export const createPage = ({ plugins, relationship }) => {

  const Widget = createWidget({ plugins })
  
  class WebPage extends React.Component {

    renderBlock (block) {
      const widgets = relationship(block, this.props.widgets)

      return (
        <Block key={`block-${block.id}`} block={block}>
          {widgets.map(widget => (
            <Widget key={`widget-${widget.id}`} widget={widget} />
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

  WebPage.propTypes = {}

  return WebPage
}
