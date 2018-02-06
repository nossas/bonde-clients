import React from 'react'
import { storiesOf } from '@storybook/react'
import { Navbar } from '../src'
import Wrapper from './Wrapper'

const user = {
  avatar: 'http://via.placeholder.com/35x35?text=U',
  first_name: 'Maria',
  last_name: 'Benatti'
}

storiesOf('Navbar', module)
  .addDecorator(story => (
    <Wrapper position='relative' width={1200}>
      {story()}
    </Wrapper>
  ))
  .add('default', () => (
    <Navbar />
  ))
  .add('with user', () => (
    <Navbar user={user} />
  ))
