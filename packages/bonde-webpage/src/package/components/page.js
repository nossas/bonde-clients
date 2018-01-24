import React from 'react'
import Block from './block'
import { createWidget } from './widget'

export const createPage = ({ plugins, relationship }) => {

  const Widget = createWidget({ plugins })
  
  class WebPage extends React.Component {
  
    render () {
      const { blocks, widgets } = this.props 
      return (
        <div className='webpage'>
        {blocks.map(block => (
          <Block key={`block-${block.id}`} block={block}>
            {relationship(block, widgets).map(widget => (
              <Widget key={`widget-${widget.id}`} widget={widget} />
            ))}
          </Block>
        ))}
        </div>
      )
    }
  }

  WebPage.propTypes = {}

  return WebPage
}
