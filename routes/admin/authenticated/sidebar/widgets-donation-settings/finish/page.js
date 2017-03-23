import React from 'react'

import { FormFinishMessage } from '~client/mobilizations/widgets/components'
import { DonationTellAFriend } from '~client/mobilizations/widgets/__plugins__/donation/components'

const DonationSettingsFinish = props => (
  <FormFinishMessage
    {...props}
    TellAFriend={DonationTellAFriend}
    successMessage='Formulário de pós-doação salvo com sucesso!'
  />
)

export default DonationSettingsFinish
