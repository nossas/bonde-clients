import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import { ControlLabel, Input, Select } from '../src/Form'

storiesOf('Form/Input', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('default', () => <Input placeholder='Placeholder' />)
  .add('invalid', () => (
    <Input value='username@g' onChange={action('onChange')} invalid />
  ))
  .add('disabled', () => <Input value='username@bonde.org' disabled />)

storiesOf('Form/ControlLabel', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('default', () => <ControlLabel>Label</ControlLabel>)

storiesOf('Form/Select', module)
  .addDecorator(story => (
    <Wrapper>
      {story()}
    </Wrapper>
  ))
  .add('default', () => (
    <Select>
      <option>Selecione</option>
    </Select>
  ))
  .add('invalid', () => (
    <Select invalid>
      <option>Selecione</option>
    </Select>
  ))
  .add('disabled', () => (
    <Select value='1' disabled>
      <option>Selecione</option>
      <option value='1'>Value 1</option>
    </Select>
  ))
