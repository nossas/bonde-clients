import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { MenuDesktop } from './'

describe('app/modules/mobilizations/components/navbar/menu-desktop', () => {
  let wrapper
  const props = {}

  before(() => {
    wrapper = shallow(<MenuDesktop {...props} />)
  })

  it('should render <MenuItems /> component properly', () => {
    expect(wrapper.find('MenuItems')).to.have.length(1)
  })
})
