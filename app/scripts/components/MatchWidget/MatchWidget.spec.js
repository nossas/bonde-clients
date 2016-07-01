import React from 'react'

import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as Paths from './../../Paths'
import MatchWidget from './MatchWidget'

describe('MatchWidget', () => {
  let component
  let sandbox

  let mockContext = {
    router: { transitionTo: sinon.spy() }
  }

  let props = {
    numberChoices: ['Framboesa', 'Auxílio Terno'],
    letterChoices: ['Hospital', 'Escola'],
    editable: true,
    mobilization: { id: 1 },
    widget: { widget: 1 }
  }

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(() => {
    component = shallow(<MatchWidget {...props} />, { context: mockContext })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#render', () => {
    context('when not passing props', () => {
      before(() => {
        component = shallow(<MatchWidget />, { context: mockContext })
      })

      it('should render MatchWidget empty if not pass choices as props', () => {
        component = shallow(<MatchWidget />, { context: mockContext })
        expect(component).to.be.ok
      })

      it('should render match button disabled', () => {
        expect(component.find('button.match').props().disabled).to.equal(true)
      })
    })

    context('when passing props', () => {
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

      it('should enable edit overlay block when mouseEnter', () => {
        component.simulate('mouseEnter')
        expect(component.find(''))
      })
    })
  })

  describe('#redirectTo', () => {
    context('when overlay widget was clicked and it is editable', () => {
      before(() => {
        component.find('OverlayWidget').simulate('click')
      })

      it('should call transitionTo', () => {
        expect(mockContext.router.transitionTo).to.have.been.called
      })

      it('should transitionTo called with correct params', () => {
        const { mobilization, widget } = props
        const path = Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
        expect(mockContext.router.transitionTo).to.have.been.calledWith(path)
      })
    })
  })
})
