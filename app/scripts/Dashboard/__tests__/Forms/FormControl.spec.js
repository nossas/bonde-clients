import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { FormControl } from '../../Forms'


describe('<FormControl />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<FormControl />, { context: {} })
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should set id when $formGroup.controlId passed by context', () => {
    wrapper.setContext({
      $formGroup: {
        controlId: 'form-group-id'
      }
    })
    expect(wrapper.find('input').props().id).to.equal('form-group-id')
  })
})
