import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Select, Textarea } from 'bonde-styleguide'
import { required } from 'services/validations'
import { FormGraphQL, Field, SubmitButton } from 'components/Form'
// module imports
import { chatbotSettingsQuery, insertChatbotSettingsMutation } from '../graphql'


const ChatbotSettingsForm = ({ chatbotId, updateScene }) => {
  // TODO: dispatch notification
  return (
    <FormGraphQL
      mutation={insertChatbotSettingsMutation}
      update={(cache, { data: { insert_chatbot_settings: { returning } } }) => {
        const { chatbot_settings } = cache.readQuery({
          query: chatbotSettingsQuery,
          variables: { chatbotId }
        })
        // TODO: Check simpler way to work with typing in graphql
        chatbot_settings.push(returning[0])
        cache.writeQuery({ query: chatbotSettingsQuery, data: { chatbot_settings }})
      }}
      refetchQueries={[{
        query: chatbotSettingsQuery,
        variables: { chatbotId }
      }]}
      onSubmit={(values, mutation) => {
        return mutation({ variables: { ...values, chatbotId } })
          .then(() => {
            // TODO: dispatch notification
            updateScene()
          })
      }}
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
    </FormGraphQL>
  )
}

ChatbotSettingsForm.propTypes = {
  chatbotId: PropTypes.number.isRequired,
  updateScene: PropTypes.func.isRequired
}

export default ChatbotSettingsForm