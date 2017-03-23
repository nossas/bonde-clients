import React from 'react'

import { FormFinishMessage } from '~client/mobilizations/widgets/components'
import { FormTellAFriend } from '~client/mobilizations/widgets/__plugins__/form/components'

const FormSettingsFinishPage = props => (
  <FormFinishMessage
    {...props}
    TellAFriend={FormTellAFriend}
    successMessage='Formulário de pós-inscrição salvo com sucesso!'
  />
)

export default FormSettingsFinishPage
