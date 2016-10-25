import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  MobilizationListItemMoreMenu
} from '~Mobilization/components/MobilizationList/MobilizationListItem'
import { setMobilizationMoreMenuActiveIndex } from '~Mobilization/MobilizationActions'

import './scss/mobilization-list-item-more.scss'

export const MobilizationListItemMore = ({
  mobilizationMoreMenuActiveIndex,
  index,
  dispatch,
  mobilization
}) => (
  <div className="list-item-more right pr3">
    <i
      className="fa fa-ellipsis-h"
      onClick={(e) => {
        if (e) e.preventDefault()
        dispatch(setMobilizationMoreMenuActiveIndex(index))
      }}
    />
    <MobilizationListItemMoreMenu
      active={mobilizationMoreMenuActiveIndex === index}
      mobilization={mobilization}
    />
  </div>
)

MobilizationListItemMore.propTypes = {
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  mobilization: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex
})

export default connect(mapStateToProps)(MobilizationListItemMore)
