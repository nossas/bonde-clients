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

    if (entity.getType() === 'image') {
      const media = <img {...mediaProps} />

      if (href) {
        return (
          <a href={href} target={target||'_blank'}>{media}</a>
        )
      }
      return media

    } else if (entity.getType() === 'iframe' || entity.getType() === 'script') {
      // insert script or iframe in div
      return (
        <div className="noscript" dangerouslySetInnerHTML={{__html: mediaProps.src }} />
      )
    } else {
      throw "Sorry, media type not found."
    }
  }
}

Media.propTypes = {
  // Injected by draft-js in blockRendererFn
  block: PropTypes.object.isRequired,
}

export default Media
