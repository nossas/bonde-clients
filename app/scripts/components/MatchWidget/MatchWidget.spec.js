import React from 'react'

import { mount } from 'enzyme'
import { expect } from 'chai'

import MatchWidget from './MatchWidget'


describe('MatchWidget', () => {
  let component

  context('when not pass props', () => {
    before(() => {
      component = mount(<MatchWidget />)
    })

    it('should render MatchWidget empty if not pass choices as props', () => {
      component = mount(<MatchWidget />)
      expect(component).to.be.ok
    })

    it('should render match button disabled', () => {
      expect(component.find('button.match').props().disabled).to.equal(true)
    })
  })

  context('when passing props', () => {
    let props = {
      numberChoices: ['Framboesa', 'Auxílio Terno'],
      letterChoices: ['Hospital', 'Escola']
    }

    before(() => {
      component = mount(<MatchWidget {...props  } />)
    })

    it('should render two <Choices> component', () => {
      expect(component.find('Choices').length).to.equal(2)
    })

    it('should enable match button when combine choices', () => {
      component.setState({
        numberSelected: 'Framboesa',
        letterSelected: 'Hospital'
      })
      expect(component.find('button.match').props().disabled).to.equal(false)
    })
  })
})
