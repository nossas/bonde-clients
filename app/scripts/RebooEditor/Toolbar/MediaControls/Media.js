import React, { Component, PropTypes } from 'react'
import { Entity } from 'draft-js'


class Media extends Component {

  render() {
    const { block } = this.props

    const entity = Entity.get(block.getEntityAt(0))
    const {
      // Inside tag a
      href,
      target,
      // Image or Iframe
      ...mediaProps
    } = entity.getData()

    const media = React.createElement(
      entity.getType(),
      {...mediaProps}
    )

    if (href) {
      return (
        <a href={href} target={target||'_blank'}>{media}</a>
      )
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
