import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { RadioGroup } from '../../Forms'


const Radio = (props) => {
  return <input type="radio" {...props} />
}


describe('<RadioGroup />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <RadioGroup value="radio-group1">
        <Radio value="radio-group1" />
        <Radio value="radio-group2" />
      </RadioGroup>
    )
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should pass value like checked to children', () => {
    const components = wrapper.find('Radio')
    expect(components.at(0).props().checked).to.equal('radio-group1')
    expect(components.at(1).props().checked).to.equal('radio-group1')
  })
})
