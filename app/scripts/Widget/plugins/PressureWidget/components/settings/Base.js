import React, { PropTypes } from 'react'

import Menu from './Menu'


const Base = ({ children, location, mobilization, widget }) => {

  return (
    <div className="flex-auto flex flex-column bg-silver gray relative">
      <Menu
        location={location}
        mobilization_id={mobilization.id}
        widget_id={widget.id}
      />
      <div className="p3 flex-auto overflow-scroll">
        {children}
      </div>
    </div>
  )
}

Base.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default Base
