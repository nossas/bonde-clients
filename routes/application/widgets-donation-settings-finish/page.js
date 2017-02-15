import React from 'react'

import { FormFinishMessage } from '~mobilizations/widgets/components'
import { DonationTellAFriend, SettingsMenu } from '~widget-plugins/donation/components'

const DonationSettingsFinish = props => (
  <FormFinishMessage
    {...props}
    SettingsMenu={SettingsMenu}
    TellAFriend={DonationTellAFriend}
    successMessage='Formulário de pós-doação salvo com sucesso!'
  />
)

export default DonationSettingsFinish
