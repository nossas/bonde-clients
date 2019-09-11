import React from 'react'
import { Card, Flexbox2 as Flexbox, Input, Button } from 'bonde-styleguide'
import { MutationForm, Field, FieldArray, FormField, SubmitButton } from 'components/Forms'
import { ContentPageComponent } from 'scenes/Dashboard/components'
import { updateChatbotMutation } from '../graphql'

const renderMenus = ({ fields, meta: { error, submitFailed } }) => (
  <Flexbox vertical>
    {fields.map((menu, index) => (
      <Card rounded={5} padding={{ x: 40, y: 40 }} margin={{ bottom: 20 }}>
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

export default ({ chatbotId }) => (
  <MutationForm
    formId='ChatbotPersistentMenu'
    mutation={updateChatbotMutation}
    variables={{ id: chatbotId }}
  >
    <ContentPageComponent>
    {() => (<FieldArray name='persistent_menu' component={renderMenus} />)}
    </ContentPageComponent>
  </MutationForm>
)