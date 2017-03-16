import React from 'react'

import { FormFinishMessage } from '~client/mobilizations/widgets/components'
import { PressureTellAFriend } from '~client/mobilizations/widgets/__plugins__/pressure/components'

const PressureSettingsFinishPage = props => (
  <FormFinishMessage
    {...props}
    TellAFriend={PressureTellAFriend}
    successMessage='Formulário de pós-pressão salvo com sucesso!'
  />
)

export default PressureSettingsFinishPage
