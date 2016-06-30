import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'

import Choices from './Choices'


describe('Choices', () => {
  let component
  const props = {
    options: ['Framboesa', 'Auxílio Terno'],
    onSelected: () => {}
  }
  
  before(() => {
    component = mount(<Choices { ...props } />)
  })

  it('should render one <ul>.choices', () => {
    const children = component.find('ul.choices')
    expect(children.length).to.equal(1)
  })

  it('should render two <li>', () => {
    const children = component.find('ul.choices li')
    expect(children.length).to.equal(2)
  })

  it('should render items passed as options props', () => {
    const children = component.find('ul.choices li')
    
    expect(children.at(0).text()).to.equal('Framboesa')
    expect(children.at(1).text()).to.equal('Auxílio Terno')
  })
    
  it('should disabled when selected choice', () => {
    component.setProps({ selected: 'Framboesa' })
    expect(component.find('ul').props().className).to.contain.string('disabled')
  })

  it('should select when selected equals choice', () => {
    component.setProps({ selected: 'Framboesa' })
    expect(component.find('li.selected').length).to.equal(1)
  })
  
  it('should call onSelected when clicked choice', () => {
    let choiceSelected
    component.setProps({
      onSelected: (selected) => choiceSelected = selected,
    })
    
    // Selected Framboesa
    component.find('li').at(0).simulate('click')
    
    expect(choiceSelected).to.equal('Framboesa')
  })
})
