import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { FormRedux } from '../../Forms'

describe('Dashboard/Forms/FormRedux', () => {
  let wrapper
  const props = {
    onSubmit: (values, dispatch) => {},
    handleSubmit: (values, dispatch) => {},
    submitting: false,
    submitFailed: false,
    dirty: false,
    valid: false
  }

  beforeEach(() => {
    wrapper = shallow(<FormRedux {...props} />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should change state submitted when finish submit success', () => {
    wrapper.setProps({ submitting: true })
    wrapper.setProps({ submitting: false, submitFailed: false })
    expect(wrapper.instance().state.submitted).to.equal(true)
  })

  describe('default', () => {
    it('className prop should be as default', () => {
      expect(wrapper.props().className).to.be.a.string
    })
    it('should contains className prop as empty string', () => {
      expect(wrapper.props().className).to.equal('form bg-white rounded')
    })
  })

  describe('when pass className prop', () => {
    const className = 'foo bar'
    const cloneProps = props
    const customProps = { className }
    before(() => {
      wrapper = shallow(<FormRedux {...Object.assign(cloneProps, customProps)} />)
    })
    it('should contains className prop as empty string', () => {
      expect(wrapper.props().className).to.equal(`form bg-white rounded ${className}`)
    })
  })
})
