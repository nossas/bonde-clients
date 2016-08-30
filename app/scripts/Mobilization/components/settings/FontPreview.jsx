import React, { PropTypes } from 'react'
import classnames from 'classnames'

const FontPreview = ({ componentClass: Component, classNames, text }) => (
  <div className={classnames('bg-white border rounded p2 mb3', classNames)}>
    <Component className="m0">{text}</Component>
  </div>
)

FontPreview.propTypes = {
  componentClass: PropTypes.string,
  classNames: PropTypes.array,
  text: PropTypes.string.isRequired
}

FontPreview.defaultProps = {
  componentClass: 'h1'
}

export default FontPreview
