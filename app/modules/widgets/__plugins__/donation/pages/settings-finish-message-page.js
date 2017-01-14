import React from 'react'

// Parent module dependencies
import { FormFinishMessage } from '../../../components'

// Current module dependencies
import { DonationTellAFriend, SettingsMenu } from '../components'

const SettingsFinishMessagePage = props => {
  return (
    <FormFinishMessage
      {...props}
      SettingsMenu={SettingsMenu}
      TellAFriend={DonationTellAFriend}
    />
  )
}

export default SettingsFinishMessagePage
