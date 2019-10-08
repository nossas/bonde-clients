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
import { Field } from 'components/Forms'

const CampaignForm = () => (
  <Card rounded={5} padding={{ x: 40, y: 40 }}>
    <Title.H3>Vamos lá!</Title.H3>
    <Spacing margin={{ top: 25, bottom: 30 }}>
      <Text>Comece dando um nome para acessar esse fluxo de conversa depois:</Text>
    </Spacing>
    <Flexbox vertical>
      <Field
        name='campaign.name'
        label='Nome do fluxo'
        placeholder='Escreva aqui o nome do fluxo'
        component={FormField}
        inputComponent={Input}
      />
      <Field
        name='campaign.diagram'
        label='Primeira mensagem'
        placeholder='Escreva a primeira mensagem aqui (você poderá editar depois).'
        component={FormField}
        inputComponent={Input}
      />
    </Flexbox>
  </Card>
)

export default CampaignForm
