import React from 'react'
import PropTypes from 'prop-types'
import {
  Flexbox2 as Flexbox,
  Input,
  Card
} from 'bonde-styleguide'
import { ImageColumn } from 'scenes/Dashboard/components'
import { Field, FormField } from 'components/Forms'

const ImageField = ({ input, label }) => (
  <div style={{ cursor: 'pointer', margin: '0 20px auto 0' }}>
    <ImageColumn value={input.value} size={40} alt={label} />
  </div>
)

ImageField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object
}

const InfoForm = () => (
  <Card rounded={5} padding={{ y: 40, left: 40, right: 150 }}>
    <Flexbox vertical>
      <Flexbox horizontal>
        <Field
          name='community.image'
          label='Imagem da comunidade'
          component={ImageField}
        />
        <Field
          name='community.name'
          label='Nome da comunidade'
          placeholder='Escreva aqui o nome da comunidade'
          component={FormField}
          inputComponent={Input}
        />
      </Flexbox>
      <Field
        name='community.description'
        label='Descrição'
        placeholder='Escreva aqui uma breve descrição da comunidade'
        component={FormField}
        inputComponent={Input}
      />
      <Field
        name='community.city'
        label='Cidade'
        placeholder='Escreva aqui sua cidade'
        component={FormField}
        inputComponent={Input}
      />
      <Field
        name='community.email_template_from'
        label='E-mail'
        placeholder='Escreva aqui o e-mail padrão para as notificações'
        component={FormField}
        inputComponent={Input}
      />
    </Flexbox>
  </Card>
)

export default InfoForm
