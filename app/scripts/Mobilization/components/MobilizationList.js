import React, { PropTypes } from 'react'

import {
  MobilizationListItemsHeader,
  MobilizationListItem
} from './'

const MobilizationList = ({ mobilizations, redirectToEdit, ...props }) => {
  return (
    <div className="mobilization-list gray20 pl5 pr4 py4 content-box">
      <MobilizationListItemsHeader />

      {mobilizations && mobilizations.map((mobilization, index) => (
        <MobilizationListItem
          {...props}
          key={`mobilization-${mobilization.id}`}
          mobilization={mobilization}
          redirectToEdit={redirectToEdit}
          index={index}
        />
      ))}
    </div>
  )
}

MobilizationList.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  redirectToEdit: PropTypes.func.isRequired
}

export default MobilizationList
