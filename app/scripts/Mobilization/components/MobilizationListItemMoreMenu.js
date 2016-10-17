import React, { PropTypes, Component } from 'react'

import './scss/mobilization-list-item-more-menu.scss'

const MobilizationListItemMoreMenu = () => (
  <div className="list-item-more-menu">
    <a href="http://google.com" target="_blank" className="gray20">
      <i className="fa fa-external-link" />
      <span>Abrir página</span>
    </a>
  </div>
)

export default MobilizationListItemMoreMenu
