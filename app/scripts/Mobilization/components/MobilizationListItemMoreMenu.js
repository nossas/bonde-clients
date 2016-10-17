import React, { PropTypes } from 'react'
import { Link } from 'react-router'
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
    <Link
      to={Paths.mobilizationTemplatesCreate(mobilization)}
      className="gray20"
    >
      <i className="fa fa-star" />
      <span>Criar template</span>
    </Link>
  </div>
)

MobilizationListItemMoreMenu.contextTypes = {
  router: PropTypes.object.isRequired
}

MobilizationListItemMoreMenu.propTypes = {
  active: PropTypes.bool.isRequired
}

MobilizationListItemMoreMenu.defaultProps = {
  active: false
}

export default MobilizationListItemMoreMenu
