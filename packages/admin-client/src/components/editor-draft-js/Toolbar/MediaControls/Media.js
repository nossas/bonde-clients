import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Entity } from 'draft-js'

class Media extends Component {
  render () {
    const { block } = this.props

    const entityKey = block.getEntityAt(0)
    const entity = entityKey ? Entity.get(entityKey) : undefined

    if (!entity) {
      // TODO: Remove behavior this code implemented because wasn't
      // control for media block
      return <span className='remove-block' />
    }

    const {
      // Inside tag a
      href,
      target,
      // Image or Iframe
      ...mediaProps
    } = entity.getData()

    const entityType = entity.getType().toLowerCase()

    if (entityType === 'image') {
      const media = <img {...mediaProps} alt='' />

      if (href) {
        return (
          <a href={href} target={target || '_blank'}>{media}</a>
        )
      }
      return media
    } else if (entityType === 'iframe' || entityType === 'script') {
      // insert script or iframe in div
      return <div className='noscript' dangerouslySetInnerHTML={{ __html: mediaProps.src }} />
    } else {
      throw new Error('Sorry, media type not found.')
    }
  }
}

Media.propTypes = {
  // Injected by draft-js in blockRendererFn
  block: PropTypes.object.isRequired
}

export default Media
