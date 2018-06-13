import React from 'react'
import { Flexbox2 as Flexbox, Header, Icon, Navbar } from 'bonde-styleguide'
import UserDropdown from './UserDropdown'

const Bonde = () => (
  <a className='homePageLink' href='http://bonde.org' title='Bonde.org'>
    <Icon name='bonde' size={18} />
  </a>
)

export default () => (
  <Header>
    <Navbar renderBrand={Bonde}>
      <Flexbox horizontal spacing='between'>
        <div />
        <UserDropdown />
      </Flexbox>
    </Navbar>
  </Header>
)
