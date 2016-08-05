import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { AtivistForm } from '../../components'


describe('<AtivistForm />', () => {
  let component

  beforeEach(() => {
    component = mount(<AtivistForm />)
  })

  it('should render ok by default', () => {
    expect(component).to.be.ok
  })

  it('should render buttonColor according passed in props', () => {
    component.setProps({ buttonColor: '#fff' })
    expect(component.find('button').props().style.backgroundColor).to.equal('#fff')
  })

  it('should return onSubmit values of state when clicked button', () => {
    let returned = undefined
    const expectState = { email: 'igor@local.cc', name: 'igor', lastName: 'santos' }
    component.setProps({ onSubmit: data => returned = data})
    component.setState(expectState)

    component.find('form').simulate('submit')
    expect(returned).to.deep.equal(expectState)
  })
})
