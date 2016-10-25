import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../../../../Paths'
import { MobilizationListItemMoreMenuAction } from './'

import './scss/mobilization-list-item-more-menu.scss'

const MobilizationListItemMoreMenu = ({ active, mobilization }) => (
  <div className={classnames('list-item-more-menu', { 'show': active })}>
    <MobilizationListItemMoreMenuAction
      componentClass="a"
      target="_blank"
      text="Abrir página"
      path={Paths.mobilization(mobilization)}
      icon="external-link"
    />
    <MobilizationListItemMoreMenuAction
      text="Criar template"
      path={Paths.mobilizationTemplatesCreate(mobilization)}
      icon="star"
    />
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
