import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

import {
  MobilizationListItemsHeader,
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemUsers,
  MobilizationListItemFundRaising,
  MobilizationListItemMore
} from './'

export const MobilizationList = ({
  ...props,
  mobilizations,
  redirectToEdit,
  mobilizationMoreMenuActiveIndex
}) => {
  return (
    <div className="mobilization-list gray20 pl5 pr4 py4 content-box">
      <MobilizationListItemsHeader />

      {mobilizations && mobilizations.map((mobilization, index) => (
        <MobilizationListItem
          key={`mobilization-${mobilization.id}`}
          className={classnames({ 'z2': mobilizationMoreMenuActiveIndex === index })}
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
          <MobilizationListItemMore {...props} mobilization={mobilization} index={index} />
        </MobilizationListItem>
      ))}
    </div>
  )
}

MobilizationList.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  redirectToEdit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex
})

export default connect(mapStateToProps)(MobilizationList)
