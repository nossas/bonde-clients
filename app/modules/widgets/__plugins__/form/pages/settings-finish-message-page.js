import React from 'react'

// Parent module dependencies
import { FormFinishMessage } from '../../../components'

// Current module dependencies
import { FormTellAFriend, SettingsMenu } from '../components'

const SettingsFinishMessagePage = props => {
  return (
    <FormFinishMessage
      {...props}
      SettingsMenu={SettingsMenu}
      TellAFriend={FormTellAFriend}
    />
  )
}

export default SettingsFinishMessagePage
