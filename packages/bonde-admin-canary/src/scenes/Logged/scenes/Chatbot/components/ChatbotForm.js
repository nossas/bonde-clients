import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Input } from 'bonde-styleguide'
import { required } from 'services/validations'
import { FormGraphQLv2, Field, SubmitButton } from 'components/Form'
// module imports
import { chatbotsQuery, insertChatbotMutation } from '../graphql'

const ChatbotForm = ({ communityId, updateScene }) => {
  // TODO: dispatch notification
  return (
    <FormGraphQLv2
      name='ChatbotForm'
      mutation={insertChatbotMutation}
      mutationVariables={{ communityId }}
      query={chatbotsQuery}
      queryVariables={{ communityId }}
      onSuccess={updateScene}
      cache={(readQuery, writeQuery, data) => {
        const { insert_chatbots: { returning } } = data
        const { chatbots } = readQuery()
        chatbots.push(returning[0])
        writeQuery({ chatbots })
      }}
    >
      <Field
        name='name'
        label='Nome do bot'
        placeholder='Escreva aqui o nome do bot'
        component={FormField}
        inputComponent={Input}
        validate={required('Nome do bot deve ser preenchido.')}
      />
      <SubmitButton>Salvar</SubmitButton>
    </FormGraphQLv2>
  )
}

ChatbotForm.propTypes = {
  communityId: PropTypes.number.isRequired,
  updateScene: PropTypes.func.isRequired
}

export default ChatbotForm
