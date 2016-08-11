import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { PressureForm, PressureCount } from '../../components'


describe('<PressureForm />', () => {
  let component

  beforeEach(() => {
    component = mount(<PressureForm />)
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
    const state = {
      email: 'igor@local.cc',
      name: 'igor',
      lastName: 'santos',
      subject: 'subject',
      body: 'body'
    }
    component.setProps({ onSubmit: data => returned = data})
    component.setState(state)

    component.find('form').simulate('submit')
    expect(returned).to.deep.equal(state)
  })

  it('should render children', () => {
    component.setProps({
      children: <PressureCount />
    })
    expect(component.find('PressureCount').length).to.equal(1)
  })

  it('should set default subject and body by props', () => {
    component.setProps({
      subject: 'subject default',
      body: 'body default'
    })
    expect(component.instance().state.subject).to.equal('subject default')
    expect(component.instance().state.body).to.equal('body default')
  })

  it('should change text of button when buttonText passed', () => {
    component.setProps({
      buttonText: 'Enviar e-mail para o alvo'
    })
    expect(component.find('button').text()).to.equal('Enviar e-mail para o alvo')
  })
})
