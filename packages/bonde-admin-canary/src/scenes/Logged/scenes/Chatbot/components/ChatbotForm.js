import React from 'react'
import PropTypes from 'prop-types'
import { FormField, Input } from 'bonde-styleguide'
import { required } from 'services/validations'
import { FormGraphQL, Field, SubmitButton } from 'components/Form'
// module imports
import { chatbotsQuery, insertChatbotMutation } from '../graphql'


const ChatbotForm = ({ communityId }) => {
  // TODO: dispatch notification
  return (
    <FormGraphQL
      mutation={insertChatbotMutation}
      update={(cache, { data: { insert_chatbots: { returning } } }) => {
        const { chatbots, ...readquery } = cache.readQuery({
          query: chatbotsQuery,
          variables: { communityId }
        })
        // TODO: Check simpler way to work with typing in graphql
        chatbots.push(returning[0])
        
        console.log('chatbots', chatbots)
        console.log('__typename', readquery)
        cache.writeQuery({ query: chatbotsQuery, data: { chatbots }})
      }}
      refetchQueries={[{
        query: chatbotsQuery,
        variables: { communityId }
      }]}
      onSubmit={(values, mutation) => {
        // TODO: dispatch notification
        return mutation({ variables: { ...values, communityId } })
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
  communityId: PropTypes.number.isRequired
}

export default ChatbotForm