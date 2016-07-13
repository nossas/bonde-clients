import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import AddChoiceForm from './AddChoiceForm'


describe('AddChoiceForm', () => {
  let component
  let props = {
    title: undefined,
    label: undefined,
    choices: [],
    handleAddItem: (choice) => {},
    handleRemoveItem: (choice) => {},
    handleChangeLabel: (label) => {}
  }

  beforeEach(() => {
    component = mount(<AddChoiceForm {...props} />)
  })

  it('should add choices state when clicked add choice', () => {
    let expected
    component.setProps({
      handleAddItem: (choice) => {
        expected = choice
      }
    })
    component.setState({'value': 'teste'})
    component.find('button').simulate('click')
    expect(expected).to.equal('teste')
  })

  it('should remove choices state when clicked remove choice', () => {
    let expected
    component.setProps({
      choices: ['Item1', 'Item2'],
      handleRemoveItem: (choice) => {
        expected = choice
      }
    })
    const row1 = component.find('.choices-block a').at(0)
    row1.simulate('click')
    expect(expected).to.equal('Item1')
  })

  it('should clear input when clicked button', () => {
    component.setState({ value: 'asdas' })
    component.find('button').simulate('click')
    expect(component.instance().state.value).to.equal('')
  })

  it('should render disabled button add when input empty', () => {
    component.setState({ value: '' })
    const button = component.find('button')
    expect(button.props().disabled).to.equal(true)
  })

  it('should not add choice when choice exists in list', () => {
    let expected = undefined
    component.setProps({
      choices: ['Item1'],
      handleAddItem: (choice) => {
        expected = choice
      }
    })
    component.setState({ value: 'Item1' })
    component.find('button').simulate('click')
    expect(expected).to.equal(undefined)
  })

  it('should add choice when keypress [Enter]', () => {
    let expected
    component.setProps({
      choices: [],
      handleAddItem: (choice) => {
        expected = choice
      }
    })
    component.setState({ value: 'Item1' })
    component.find('input').at(1).simulate('keypress', { key: 'Enter' })
    expect(expected).to.equal('Item1')
  })
})
