import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import {
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemUsers,
  MobilizationListItemFundRaising,
  MobilizationListItemMoreMenu
} from './'

import './scss/mobilization-list-item.scss'

const MobilizationListItem = ({ mobilization, redirectToEdit }) => !mobilization ? null : (
  <Link
    className="mobilization-list-item bg-white gray20 block clearfix hover"
    to={typeof redirectToEdit === 'function' ? redirectToEdit(mobilization.id) : ''}
  >
    <MobilizationListItemAvatar {...mobilization} />
    <MobilizationListItemMoreMenu />

    <div className="list-item-table-container overflow-hidden">
      <MobilizationListItemName {...mobilization} />
      <MobilizationListItemCreatedAt {...mobilization} />
      <MobilizationListItemUsers {...mobilization} />
      <MobilizationListItemFundRaising {...mobilization} />
    </div>
  </Link>
)

MobilizationListItem.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default MobilizationListItem
