import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { FormRedux } from '../../Forms'


describe('<FormRedux />', () => {
  let wrapper
  const stubProps = {
    onSubmit: (values, dispatch) => {},
    handleSubmit: (values, dispatch) => {},
    submitting: false,
    submitFailed: false
  }

  beforeEach(() => {
    wrapper = mount(<FormRedux {...stubProps} />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should change state submitted when finish submit success', () => {
    wrapper.setProps({ submitting: true })
    wrapper.setProps({ submitting: false, submitFailed: false })
    expect(wrapper.instance().state.submitted).to.equal(true)
  })
})
