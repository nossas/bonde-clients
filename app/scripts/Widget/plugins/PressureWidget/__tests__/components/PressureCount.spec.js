import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { PressureCount } from '../../components'


describe('<PressureCount />', () => {
  let componet

  beforeEach(() => {
    componet = mount(<PressureCount />)
  })

  it('should render ok and total 0 by default', () => {
    const totalSpan = componet.find('span').at(0)
    expect(totalSpan.text()).to.equal('0')
  })

  it('should paint number with totalColor', () => {
    componet.setProps({ totalColor: '#444' })
    const totalSpan = componet.find('span').at(0)
    expect(totalSpan.props().style.color).to.equal('#444')
  })

  it('should render total according total passed', () => {
    componet.setProps({ total: 420 })
    const totalSpan = componet.find('span').at(0)
    expect(totalSpan.text()).to.equal('420')
  })
})
