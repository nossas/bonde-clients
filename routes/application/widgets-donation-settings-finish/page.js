import React from 'react'

// Parent module dependencies
import { FormFinishMessage } from '~mobilizations/widgets/components'

// Current module dependencies
import { DonationTellAFriend, SettingsMenu } from '~widget-plugins/donation/components'

const WidgetsDonationSettingsFinish = props => (
  <FormFinishMessage
    {...props}
    SettingsMenu={SettingsMenu}
    TellAFriend={DonationTellAFriend}
    successMessage='Formulário de pós-doação salvo com sucesso!'
  />
)

export default WidgetsDonationSettingsFinish
