import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import * as Paths from '../../../scripts/Paths'

import './sidenav.scss'

class Sidenav extends Component {
  render() {
    const { user, children } = this.props
    return (
      <nav className="sidenav clearfix">
        <Link className="logo-icon" to="/" />
        {children}
      </nav>
    )
  }
}

Sidenav.contextTypes = {
  router: PropTypes.object
}

export default Sidenav
