import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Input, Textarea } from 'bonde-styleguide'
import { required } from 'services/validations'
import { FormGraphQLv2, Field, SubmitButton } from 'components/Form'
// module imports
import { chatbotCampaignsQuery, insertChatbotCampaignsMutation } from '../graphql'

const ChatbotCampaignsForm = ({ chatbotId, updateScene }) => {
  // TODO: dispatch notification
  return (
    <FormGraphQLv2
      name='ChatbotCampaignsForm'
      mutation={insertChatbotCampaignsMutation}
      mutationVariables={{ chatbotId }}
      query={chatbotCampaignsQuery}
      queryVariables={{ chatbotId }}
      onSuccess={updateScene}
      cache={(readQuery, writeQuery, data) => {
        const { insert_chatbot_campaigns: { returning } } = data
        const { chatbot_campaigns: campaigns } = readQuery()
        campaigns.push(returning[0])
        writeQuery({ chatbot_campaigns: campaigns })
      }}
    >
      <Field
        name='name'
        label='Nome da campanha'
        placeholder='Escreva aqui o nome da campanha'
        component={FormField}
        inputComponent={Input}
        validate={required('Nome da campanha deve ser preenchido.')}
      />
      {/* TODO: autofill with slug of name */}
      <Field
        name='prefix'
        label='Prefixo da campanha'
        placeholder='Escreva aqui o prefixo da campanha'
        component={FormField}
        inputComponent={Input}
        validate={required('Prefixo da campanha deve ser preenchido.')}
      />
      <Field
        name='diagram'
        label='Fluxo de conversa'
        placeholder='Informe seu fluxo de conversa no formato JSON'
        component={FormField}
        inputComponent={Textarea}
        validate={required('Fluxo de conversa deve ser preenchido')}
      />
      <SubmitButton>Salvar</SubmitButton>
    </FormGraphQLv2>
  )
}

ChatbotCampaignsForm.propTypes = {
  chatbotId: PropTypes.number.isRequired,
  updateScene: PropTypes.func.isRequired
}

export default ChatbotCampaignsForm
