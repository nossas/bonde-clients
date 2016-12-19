import React, { PropTypes } from 'react'
import classnames from 'classnames'


const Mobilization = props => {

  const {
    mobilization: {
      color_scheme,
      header_font,
      body_font,
    },
    editable
  } = props

  const themeClassName = `${color_scheme} ${header_font}-header ${body_font}-body`
  const layoutClassName = editable ? 'flex-auto relative' : 'absolute'

  return (
    <div className={classnames('flex flex-column', themeClassName, layoutClassName)}>
    </div>
  )
}

Mobilization.propTypes = {
  editable: PropTypes.bool.isRequired,
  mobilization: PropTypes.object.isRequired,
}

Mobilization.defaultProps = {
  editable: false,
}

export default Mobilization
