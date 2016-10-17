import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import {
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemUsers,
  MobilizationListItemFundRaising,
  MobilizationListItemMore
} from './'

import './scss/mobilization-list-item.scss'

const MobilizationListItem = ({ mobilization, redirectToEdit, index, ...props }) =>
  !mobilization ? null : (
    <div className="mobilization-list-item bg-white block clearfix hover relative">
      <Link
        className="gray20"
        to={typeof redirectToEdit === 'function' ? redirectToEdit(mobilization.id) : ''}
      >
        <MobilizationListItemAvatar {...mobilization} />

        <div className="list-item-table-container overflow-hidden">
          <MobilizationListItemName {...mobilization} />
          <MobilizationListItemCreatedAt {...mobilization} />
          <MobilizationListItemUsers {...mobilization} />
          <MobilizationListItemFundRaising {...mobilization} />
        </div>
      </Link>
      <MobilizationListItemMore {...props} index={index} />
    </div>
  )

MobilizationListItem.propTypes = {
  mobilization: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default MobilizationListItem
