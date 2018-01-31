import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import { ControlLabel, Input } from '../src/Form'

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
