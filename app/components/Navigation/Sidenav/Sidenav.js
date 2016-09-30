import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import * as Paths from '../../../scripts/Paths'

import './sidenav.scss'

class Sidenav extends Component {
  render() {
    const { user, children } = this.props
    return (
      <nav className="sidenav clearfix">
        <div className="items items-logo">
          <Link to={Paths.mobilizations()}>
            <div className="item">
              <div className="item-icon">
                <u className="logo-icon" />
              </div>
              <div className="item-content">
                <div className="table-cell align-middle">
                  <u className="logo" />
                </div>
              </div>
            </div>
          </Link>
        </div>
        {children}
      </nav>
    )
  }
}

Sidenav.contextTypes = {
  router: PropTypes.object
}

export default Sidenav
