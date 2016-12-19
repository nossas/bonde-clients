import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Menu } from '../../../components/Navbar'

describe('<Menu />', () => {
  let wrapper
  const props = {
    blocks: [
      {
        id: 1,
        hidden: false,
        menu_hidden: false
      }
    ]
  }

  beforeEach(() => {
    wrapper = mount(<Menu {...props} />)
  })

  it('renders without crashed', () => {
    expect(wrapper).to.be.ok
  })
})
