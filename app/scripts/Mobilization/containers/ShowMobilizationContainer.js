import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import BlockContainer from '../../Block/containers/BlockContainer'


class ShowMobilizationContainer extends Component {

  render() {
    const { color_scheme, header_font, body_font } = this.props.mobilization
    const pageClass = classnames(
      color_scheme,
      `${header_font}-header`,
      `${body_font}-body`,
      'absolute',
      'flex',
      'flex-column'
    )

    // TODO: Should ordered of blocks in reducers?
    const { blocks, editable } = this.props
    if (blocks && blocks.length > 1) {
      blocks.sort((a, b) => a.position - b.position)
    }

    return (
      <div className={pageClass}  style={{top: 0, bottom: 0, left: 0, right: 0}}>
        <div id='blocks-list' className='flex-auto' style={{overflowY: 'scroll'}}>
          {blocks && blocks.map(block => {
            if (!editable && block.hidden) {
              return null
            }
            return <BlockContainer block={block} editable={editable}/>
          })}
        </div>
      </div>
    )
  }
}

ShowMobilizationContainer.propTypes = {
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    goal: PropTypes.string,

    google_analytics_code: PropTypes.string,
    facebook_share_title: PropTypes.string,
    facebook_share_description: PropTypes.string,
    facebook_share_image: PropTypes.string,

    color_scheme: PropTypes.string.isRequired,
    header_font: PropTypes.string.isRequired,
    body_font: PropTypes.string.isRequired
  }),
  blocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    bg_class: PropTypes.string.isRequired,
    bg_image: PropTypes.string,
    hidden: PropTypes.bool,
    position: PropTypes.number
  })),
  editable: PropTypes.bool
}

export default ShowMobilizationContainer
