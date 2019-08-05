import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Input } from 'bonde-styleguide'
import { required } from 'services/validations'
import { FormGraphQL, Field, SubmitButton } from 'components/Form'
// module imports
import { chatbotsQuery, insertChatbotMutation } from '../graphql'


const ChatbotForm = ({ communityId, updateScene }) => {
  // TODO: dispatch notification
  return (
    <FormGraphQL
      mutation={insertChatbotMutation}
      update={(cache, { data: { insert_chatbots: { returning } } }) => {
        const { chatbots } = cache.readQuery({
          query: chatbotsQuery,
          variables: { communityId }
        })
        // TODO: Check simpler way to work with typing in graphql
        chatbots.push(returning[0])
        cache.writeQuery({ query: chatbotsQuery, data: { chatbots }})
      }}
      refetchQueries={[{
        query: chatbotsQuery,
        variables: { communityId }
      }]}
      onSubmit={(values, mutation) => {
        return mutation({ variables: { ...values, communityId } })
          .then(() => {
            // TODO: dispatch notification
            updateScene()
          })
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
    </FormGraphQL>
  )
}

ChatbotForm.propTypes = {
  communityId: PropTypes.number.isRequired,
  updateScene: PropTypes.func.isRequired
}

export default ChatbotForm