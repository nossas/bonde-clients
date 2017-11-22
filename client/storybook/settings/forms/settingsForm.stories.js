import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/storybook/settings/layout'
import {
  SettingsForm,
  TextField,
  RadioField,
  Radio
} from '~client/storybook/forms'

const Form = (props) => (
  <SettingsForm
    onSubmit={e => {
      e.preventDefault()
      action('onSubmit')()
    }}
    {...props}
  >
    <TextField label='Input text' type='text' />
    <TextField label='Input number' type='number' />
    <RadioField label='Radio button' value='yes'>
      <Radio value='yes'>Yes</Radio>
      <Radio value='no'>No</Radio>
    </RadioField>
  </SettingsForm>
)

storiesOf('Formulário de configuração', module)
  .addDecorator(story => (
    <SettingsPageLayout>
      <SettingsPageMenuLayout title='Configure seu widget' />
      <SettingsPageContentLayout>
        {story()}
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  ))
  .add('default', () => (
    <Form />
  ))
  .add('when submitting', () => (
    <Form submitting />
  ))
  .add('when submit of success', () => (
    <Form
      submitted
      successMessage='Formulário salvo com sucesso!'
    />
  ))
