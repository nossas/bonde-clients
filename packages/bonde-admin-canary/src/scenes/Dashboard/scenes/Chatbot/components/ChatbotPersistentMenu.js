import React from 'react'
import PropTypes from 'prop-types'
import { Card, Flexbox2 as Flexbox, Input, Button } from 'bonde-styleguide'
import { MutationForm, Field, FieldArray, FormField, SubmitButton } from 'components/Forms'
import { ContentPageComponent } from 'scenes/Dashboard/components'
import { updateChatbotMutation } from '../graphql'

const MenuFieldArray = ({ fields, meta: { error, submitFailed } }) => (
  <Flexbox vertical>
    {fields.map((menu, index) => (
      <Card key={`menu-field-${index}`} rounded={5} padding={{ x: 40, y: 40 }} margin={{ bottom: 20 }}>
        <Flexbox vertical>
          <Field
            type='text'
            name={`${menu}.title`}
            label='Título do menu'
            component={FormField}
            inputComponent={Input}
          />
          <Field
            type='text'
            name={`${menu}.payload`}
            label='Mensagem de destino'
            component={FormField}
            inputComponent={Input}
          />
        </Flexbox>
        <Button flat type='button' onClick={() => fields.remove(index)}>Remover menu</Button>
      </Card>
    ))}
    <Flexbox horizontal spacing='between'>
      <SubmitButton formId='ChatbotPersistentMenu'>Salvar</SubmitButton>
      <Button type='button' onClick={() => fields.push({})}>Adicionar menu</Button>
    </Flexbox>
  </Flexbox>
)

MenuFieldArray.propTypes = {
  fields: PropTypes.array,
  meta: PropTypes.object
}

const ChatbotPersistentMenu = ({ chatbot }) => (
  <MutationForm
    formId='ChatbotPersistentMenu'
    mutation={updateChatbotMutation}
    variables={{ id: chatbot.id }}
    values={{ persistent_menu: chatbot.persistent_menu }}
  >
    <ContentPageComponent>
      {() => (<FieldArray name='persistent_menu' component={MenuFieldArray} />)}
    </ContentPageComponent>
  </MutationForm>
)

ChatbotPersistentMenu.propTypes = {
  chatbot: PropTypes.object
}

export default ChatbotPersistentMenu
