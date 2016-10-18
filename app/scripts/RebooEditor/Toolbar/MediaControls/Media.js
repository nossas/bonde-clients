import React, { Component, PropTypes } from 'react'
import { Entity } from 'draft-js'


class Media extends Component {

  render() {
    const { block } = this.props

    const entity = Entity.get(block.getEntityAt(0))
    const { src, ...extraProps } = entity.getData()
    const type = entity.getType()

    let media
    if (type === 'image') {
      media = <img src={src} {...extraProps} />
    } else if (type == 'iframe') {
      media = <iframe src={src} {...extraProps} />
    }

    return media
  }
}

Media.propTypes = {
  // Injected by draft-js in blockRendererFn
  block: PropTypes.object.isRequired,
  contentState: PropTypes.object.isRequired
}

export default Media
