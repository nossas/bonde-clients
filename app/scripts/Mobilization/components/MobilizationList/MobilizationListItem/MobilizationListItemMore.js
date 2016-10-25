import React, { PropTypes } from 'react'

import { setMobilizationMoreMenuActiveIndex } from '../../../MobilizationActions'

import './scss/mobilization-list-item-more.scss'

export const MobilizationListItemMore = ({ index, dispatch, children }) => (
  <div className="list-item-more right pr3">
    <i
      className="fa fa-ellipsis-h"
      onClick={(e) => {
        if (e) e.preventDefault()
        dispatch(setMobilizationMoreMenuActiveIndex(index))
      }}
    />
    {children}
  </div>
)

MobilizationListItemMore.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default MobilizationListItemMore
