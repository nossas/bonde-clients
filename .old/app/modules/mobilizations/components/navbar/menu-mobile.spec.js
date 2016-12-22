import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { MenuMobile } from './'

describe('app/modules/mobilizations/components/navbar/menu-mobile', () => {
  let wrapper
  const props = {}

  before(() => {
    wrapper = shallow(<MenuMobile {...props} />)
  })

  it('should render <MenuItems /> component properly', () => {
    expect(wrapper.find('MenuItems')).to.have.length(1)
  })
})
