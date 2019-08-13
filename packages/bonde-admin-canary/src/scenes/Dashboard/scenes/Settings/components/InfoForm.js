import React from 'react'
import {
  Flexbox2 as Flexbox,
  FormField,
  Input,
  Card
} from 'bonde-styleguide'
import { Form, Field } from 'components/Form'

const InfoForm = () => (
  <Card rounded={5} padding={{ x: 40, y: 40 }}>
    <Form>
      <Flexbox vertical>
        <Field
          name='name'
          label='Nome da comunidade'
          placeholder='Escreva aqui o nome da comunidade'
          component={FormField}
          inputComponent={Input}
        />
        <Field
          name='description'
          label='Descrição'
          placeholder='Escreva aqui uma breve descrição da comunidade'
          component={FormField}
          inputComponent={Input}
        />
        <Field
          name='city'
          label='Cidade'
          placeholder='Escreva aqui sua cidade'
          component={FormField}
          inputComponent={Input}
        />
        <Field
          name='email'
          label='E-mail'
          placeholder='Escreva aqui o e-mail padrão para as notificações'
          component={FormField}
          inputComponent={Input}
        />
      </Flexbox>
    </Form>
  </Card>
)

export default InfoForm
