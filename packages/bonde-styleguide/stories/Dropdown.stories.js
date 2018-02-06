import React from 'react'
import { storiesOf } from '@storybook/react'
import Wrapper from './Wrapper'
import Dropdown, { Item as DropdownItem } from '../src/Dropdown'

storiesOf('Dropdown', module)
  .add('Default', () => (
    <Wrapper bg='#000'>
      <Dropdown label='Dropdown'>
        <DropdownItem>Abrir página</DropdownItem>
      </Dropdown>
    </Wrapper>
  ))
