import React, { PropTypes } from 'react'

const MobilizationListItemCopyNumber = ({ copy_number }) => (
  <div className="list-item-users px3 col col-2">
    {copy_number || '-'}
  </div>
)

MobilizationListItemCopyNumber.propTypes = {
  copy_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default MobilizationListItemCopyNumber
