import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Radio } from '../../Forms'


describe('<Radio />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Radio />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should mount id with `$radio-{value}-id` passed to set label and input', () => {
    wrapper.setProps({ value: 'dummy' })
    expect(wrapper.find('label').props().htmlFor).to.equal('dummy-id')
    const input = wrapper.find('label').find('input')
    expect(input.props().id).to.equal('dummy-id')
  })

  it('should mark checked is true when props.checked equals props.value', () => {
    wrapper.setProps({ value: 'dummy', checked: 'dummy' })
    expect(wrapper.find('label').find('input').props().checked).to.equal(true)
  })

  it('should add class mr1 if layout is horizontal', () => {
    wrapper.setProps({ layout: 'horizontal' })
    expect(wrapper.find('label').props().className).to.contain('mr1')
  })

  it('should add class block if layout is vertical', () => {
    wrapper.setProps({ layout: 'vertical' })
    expect(wrapper.find('label').props().className).to.contain('block')
  })
})
