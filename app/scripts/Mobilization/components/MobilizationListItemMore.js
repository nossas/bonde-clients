import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { MobilizationListItemMoreMenu } from './'
import { setMobilizationMoreMenuActiveIndex } from '../MobilizationActions'

import './scss/mobilization-list-item-more.scss'

export const MobilizationListItemMore = ({ mobilizationMoreMenuActiveIndex, index, dispatch }) => (
  <div className="list-item-more right pr3">
    <i
      className="fa fa-ellipsis-h"
      onClick={(e) => {
        e.preventDefault()
        dispatch(setMobilizationMoreMenuActiveIndex(index))
        console.log(e.target)
      }}
    />
    <MobilizationListItemMoreMenu active={mobilizationMoreMenuActiveIndex === index} />
  </div>
)

MobilizationListItemMore.propTypes = {
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex
})

export default connect(mapStateToProps)(MobilizationListItemMore)
