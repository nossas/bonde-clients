import React, { PropTypes } from 'react'
import classnames from 'classnames'

import * as Plugins from '../__plugins__'

const Widget = ({ widget, ...rest }) => {
  const kind = widget.kind ? widget.kind.charAt(0).toUpperCase() + widget.kind.slice(1) : 'Draft'
  const Plugin = Plugins[kind]

  const { sm_size: smSize, md_size: mdSize, lg_size: lgSize } = widget
  const className = classnames(
    'px2 col mb4 md-mb0',
    `col-${smSize} sm-col-${smSize} md-col-${mdSize} lg-col-${lgSize}`
  )

  return (
    <div className={className}>
      {
        Plugin
        ? <Plugin {...rest} widget={widget} />
        : <span className='red'>Widget {kind} not found</span>
      }
    </div>
  )
}

Widget.propTypes = {
  widget: PropTypes.shape({
    id: PropTypes.number.isRequired,
    kind: PropTypes.string.isRequired,
    sm_size: PropTypes.string,
    md_size: PropTypes.string,
    lg_size: PropTypes.string
  }).isRequired
}

export default Widget
