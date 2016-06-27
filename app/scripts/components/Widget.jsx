import React, { PropTypes } from 'react'
import classnames from 'classnames'

import { DraftWidget, ContentWidget, FormWidget, DonationWidget } from './'


const Widget = (props) => {
  let { widget } = props
  let className = classnames(
    'px2', 'col', 'mb4', 'md-mb0',
    'col-' + widget.sm_size,
    'sm-col-' + widget.sm_size,
    'md-col-' + widget.md_size,
    'lg-col-' + widget.lg_size
  )

  let child = null
  if (widget.kind === 'content') {
    child = <ContentWidget {...props} />
  } else if (widget.kind === 'form') {
    child = <FormWidget {...props} />
  } else if (widget.kind === 'donation') {
    child = <DonationWidget {...props} />
  } else {
    child = <DraftWidget {...props} />
  }

  return (
    <div className={className}>{child}</div>
  )
}

Widget.propTypes = {
  widget: PropTypes.object.isRequired,
}

export default Widget
