import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { ControlLabel } from '../../Forms'


describe('<ControlLabel />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<ControlLabel>label</ControlLabel>, { context: {} })
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should set htmlFor when $formGroup.controlId passed by context', () => {
    wrapper.setContext({
      $formGroup: {
        controlId: 'form-group-id'
      }
    })
    expect(wrapper.find('label').props().htmlFor).to.equal('form-group-id')
  })

  it('should render text children', () => {
    expect(wrapper.find('label').text()).to.equal('label')
  })

})
