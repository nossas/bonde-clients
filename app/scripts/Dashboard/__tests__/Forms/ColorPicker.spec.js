import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { ColorPicker } from '../../Forms'


describe('<ColorPicker />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<ColorPicker />, { context: {} })
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should set value passed by context', () => {
    wrapper.setContext({
      $formGroup: {
        value: '#fff'
      }
    })
    expect(wrapper.find('ColorPicker').at(1).props().color).to.equal('#fff')
  })
})
