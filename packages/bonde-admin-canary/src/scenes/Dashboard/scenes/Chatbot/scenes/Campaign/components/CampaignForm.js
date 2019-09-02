import React from 'react'
import {
  Flexbox2 as Flexbox,
  FormField,
  Input,
  Card,
  Title,
  Text,
  Spacing
} from 'bonde-styleguide'
import { Field } from 'components/Form'

const CampaignForm = () => (
  <Card rounded={5} padding={{ x: 40, y: 40 }}>
    <Title.H3>Vamos lá!</Title.H3>
    <Spacing margin={{ top: 25, bottom: 30 }}>
      <Text>Comece dando um nome para acessar esse fluxo de conversa depois:</Text>
    </Spacing>
    <Flexbox vertical>
      <Field
        name='name'
        label='Nome do fluxo'
        placeholder='Escreva aqui o nome da comunidade'
        component={FormField}
        inputComponent={Input}
      />
      <Field
        name='prefix'
        label='Identificador da campanha'
        placeholder='Escreva aqui o identificador da campanha'
        component={FormField}
        inputComponent={Input}
      />
    </Flexbox>
  </Card>
)

export default CampaignForm
