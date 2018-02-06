import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import Dropdown, { Item as DropdownItem } from '../src/Dropdown'
import * as Icon from '../src/Icon'

storiesOf('Dropdown', module)
  .add('default', () => (
    <Wrapper bg='#000'>
      <Dropdown label='Dropdown'>
        <DropdownItem onClick={action('clicked Menu 1')}>Menu 1</DropdownItem>
        <DropdownItem onClick={action('clicked Menu 2')}>Menu 2</DropdownItem>
      </Dropdown>
    </Wrapper>
  ))
  .add('with icon', () => (
    <Wrapper bg='#000'>
      <Dropdown label='Minha sampa' width={200}>
        <DropdownItem onClick={action('clicked Abrir página')}>
          <Icon.Share /> Abrir página
        </DropdownItem>
        <DropdownItem onClick={action('clicked Duplicar')}>
          <Icon.Copy /> Duplicar
        </DropdownItem>
        <DropdownItem onClick={action('clicked Criar template')}>
          <Icon.Star /> Criar template
        </DropdownItem>
        <DropdownItem onClick={action('clicked Arquivar')}>
          <Icon.Archive /> Arquivar
        </DropdownItem>
        <DropdownItem onClick={action('clicked Deletar')}>
          <Icon.Times /> Deletar
        </DropdownItem>
      </Dropdown>
    </Wrapper>
  ))
