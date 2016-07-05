import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'

import AddChoiceForm from './AddChoiceForm'


describe('AddChoiceForm', () => {
  let component
  let props = {
    titleForm: '',
    choices: [],
    updateChoices: (choices) => {}
  }

  beforeEach(() => {
    component = mount(<AddChoiceForm {...props} />)
  })

  it('should add choices state when clicked add choice', () => {
    let expected
    component.setProps({
      updateChoices: (choices) => {
        expected = choices
      }
    })
    component.setState({'value': 'teste'})
    component.find('button').simulate('click')
    expect(expected.length).to.equal(1)
  })

  it('should remove choices state when clicked remove choice', () => {
    let expected
    component.setProps({
      choices: ['Item1', 'Item2'],
      updateChoices: (choices) => {
        expected = choices
      }
    })
    const row1 = component.find('.choices-block a').at(0)
    row1.simulate('click')
    expect(expected.length).to.equal(1)
  })

  it('should clear input when clicked button', () => {
    component.setState({ value: 'asdas' })
    component.find('button').simulate('click')
    expect(component.instance().state.value).to.equal('')
  })
})
