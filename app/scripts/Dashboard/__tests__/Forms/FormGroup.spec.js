import React, { Component, PropTypes } from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { FormGroup } from '../../Forms'


class ControlLabel extends Component {

  render() {
    const formGroup = this.context.$formGroup

    return <label {...formGroup} />
  }
}

ControlLabel.contextTypes = {
  $formGroup: PropTypes.object.isRequired,
}


describe('<FormGroup />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <FormGroup controlId="form-group-id">
        <ControlLabel>Dummy</ControlLabel>
      </FormGroup>
    )
  })

  it('should render empty by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should passed controlId by context', () => {
    const label = wrapper.find('ControlLabel').find('label')
    expect(label.props()).to.deep.equal({
      controlId: 'form-group-id',
      value: undefined,
      onChange: undefined,
      onBlur: undefined
    })
  })

  it('should render <Raise /> when error and touched passed', () => {
    wrapper.setProps({
      error: 'Required field',
      touched: true
    })
    expect(wrapper.find('Raise').length).to.equal(1)
    expect(wrapper.find('Raise').props().error).to.equal('Required field')
  })

  it('should pass to context child props redux-form field', () => {
    const onChange = () => {}
    const onBlur = () => {}
    wrapper.setProps({
      value: 'dummy',
      onChange: onChange,
      onBlur: onBlur
    })
    const label = wrapper.find('ControlLabel').find('label')
    expect(label.props().controlId).to.equal('form-group-id')
    expect(label.props().value).to.equal('dummy')
    expect(label.props().onChange).to.equal(onChange)
    expect(label.props().onBlur).to.equal(onBlur)
  })

  it('should render with padding right if passed layout is inline', () => {
    wrapper.setProps({ layout: 'inline' })
    expect(wrapper.find('div').props().style).to.deep.equal({
      paddingRight: '1rem'
    })
  })
})
