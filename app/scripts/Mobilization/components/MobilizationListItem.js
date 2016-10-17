import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

import {
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemUsers,
  MobilizationListItemFundRaising,
  MobilizationListItemMore
} from './'

import './scss/mobilization-list-item.scss'

export const MobilizationListItem = ({
  ...props,
  mobilization,
  redirectToEdit,
  index,
  mobilizationMoreMenuActiveIndex
}) =>
  !mobilization ? null : (
    <div
      className={classnames(
        'mobilization-list-item bg-white block clearfix hover relative',
        { 'z2': mobilizationMoreMenuActiveIndex === index }
      )}
    >
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

const mapStateToProps = state => ({
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex
})

export default connect(mapStateToProps)(MobilizationListItem)
