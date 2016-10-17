import React, { PropTypes } from 'react'

import { MobilizationListItemMoreMenu } from './'

import './scss/mobilization-list-item-more.scss'

const MobilizationListItemMore = () => (
  <div className="list-item-more right pr3">
    <i className="fa fa-ellipsis-h" />
    <MobilizationListItemMoreMenu />
  </div>
)

export default MobilizationListItemMore
