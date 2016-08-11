import React, { PropTypes } from 'react'

import MobilizationCard from './MobilizationCard'


const MobilizationList = ({ mobilizations, redirectToEdit }) => {

  return (
    <div className="col-6 mx-auto py3 px4">
      {mobilizations && mobilizations.map((mobilization) => {
          return <MobilizationCard
                    key={'mobilization-' + mobilization.id}
                    redirectToEdit={redirectToEdit}
                    mobilization={mobilization} />
        })
      }
    </div>
  )
}

MobilizationList.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  redirectToEdit: PropTypes.func
}

export default MobilizationList
