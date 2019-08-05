import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Select, Textarea } from 'bonde-styleguide'
import { required } from 'services/validations'
import { FormGraphQLv2, Field, SubmitButton } from 'components/Form'
// module imports
import { chatbotSettingsQuery, insertChatbotSettingsMutation } from '../graphql'


const ChatbotSettingsForm = ({ chatbotId, updateScene }) => {
  // TODO: dispatch notification
  return (
    <FormGraphQLv2
      mutation={insertChatbotSettingsMutation}
      mutationVariables={{ chatbotId }}
      query={chatbotSettingsQuery}
      queryVariables={{ chatbotId }}
      cache={(readQuery, writeQuery, data) => {
        const { insert_chatbot_settings: { returning } } = data
        const { chatbot_settings } = readQuery()
        chatbot_settings.push(returning[0])
        writeQuery({ chatbot_settings })
      }}
      onSuccess={updateScene}
    >
      <Field
        name='channel'
        label='Canal'
        component={FormField}
        inputComponent={(props) => {
          return (
            <Select native {...props}>
              <option value='facebook'>Facebook</option>
              <option value='whatsapp'>WhatsApp</option>
              <option value='google'>Google Assistent</option>
            </Select>
          )
        }}
        validate={required('Canal deve ser preenchido')}
      />
      <Field
        name='settings'
        label='Configurações'
        placeholder='Informe suas configurações no formato JSON'
        component={FormField}
        inputComponent={Textarea}
        validate={required('Configurações deve ser preenchido')}
      />
      <SubmitButton>Salvar</SubmitButton>
    </FormGraphQLv2>
  )
}

ChatbotSettingsForm.propTypes = {
  chatbotId: PropTypes.number.isRequired,
  updateScene: PropTypes.func.isRequired
}

export default ChatbotSettingsForm