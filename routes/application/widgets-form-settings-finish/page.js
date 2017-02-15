import React from 'react'

import { FormFinishMessage } from '~mobilizations/widgets/components'
import { FormTellAFriend, SettingsMenu } from '~widget-plugins/form/components'

const WidgetsFormSettingsFinishPage = props => (
  <FormFinishMessage
    {...props}
    SettingsMenu={SettingsMenu}
    TellAFriend={FormTellAFriend}
    successMessage='Formulário de pós-inscrição salvo com sucesso!'
  />
)

export default WidgetsFormSettingsFinishPage
