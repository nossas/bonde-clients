import React, { PropTypes } from 'react'
import classnames from 'classnames'

import * as Paths from '../../Paths'

import './scss/mobilization-list-item-more-menu.scss'

const MobilizationListItemMoreMenu = ({ active, mobilization }) => (
  <div className={classnames('list-item-more-menu', { 'show': active })}>
    <a
      href={Paths.mobilization(mobilization)}
      target="_blank"
      className="gray20"
    >
      <i className="fa fa-external-link" />
      <span>Abrir página</span>
    </a>
  </div>
)

MobilizationListItemMoreMenu.propTypes = {
  active: PropTypes.bool.isRequired
}

MobilizationListItemMoreMenu.defaultProps = {
  active: false
}

export default MobilizationListItemMoreMenu
