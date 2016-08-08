import React, { PropTypes } from 'react'

import * as Paths from '../../Paths'

import { CloseButton } from '../../components'


const SettingsBase = ({ children, mobilization }) => {
  return (
    <div className="flex-auto flex flex-column bg-silver gray relative">
      {children}
      <CloseButton
        dirty={false}
        path={Paths.editMobilization(mobilization.id)} />
    </div>
  )
}


SettingsBase.propTypes = {
  children: PropTypes.array,
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired
}

export default SettingsBase
