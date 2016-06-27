import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import DonationWidget from './DonationWidget.jsx'


describe('DonationWidget', () => {
  let props = {
    editable: false,
    mobilization: {},
    widget: {},
  }
  let context = {
    router: { transitionTo: () => {} }
  }

  describe('static render', () => {

    beforeEach(() => {
      sinon.spy(context.router, 'transitionTo')
    })

    afterEach(() => {
      context.router.transitionTo.restore()
    })

    it('should render TellAFriend when state.success is true', () => {
      let wrapper = shallow(<DonationWidget {...props} />, { context })
      wrapper.setState({ success: true })

      expect(wrapper.find('TellAFriend').length).to.equal(1)
    })

    it('should add script pagar.me when props.configurable is false', () => {
      let wrapper = shallow(<DonationWidget {...props} />, { context })
      let script = wrapper.find('script').at(0)
      expect(
        script.props().dangerouslySetInnerHTML.__html
      ).to.match(
        /https:\/\/assets.pagar.me\/checkout\/checkout.js/i
      )
    })

    it('should render overlay if props.editable and state.hasMouseOver is true', () => {
      props.editable = true
      props.configurable = false

      let wrapper = shallow(<DonationWidget {...props} />, { context })
      wrapper.setState({ hasMouseOver: true })

      expect(wrapper.find('div.absolute').length).to.equal(1)
    })

    it('should call transitionTo if props.editable and state.hasMouseOver is true and clicked block', () => {
      props.editable = true
      props.configurable = false

      let wrapper = shallow(<DonationWidget {...props} />, { context })
      wrapper.setState({ hasMouseOver: true })

      wrapper.simulate('click')

      expect(context.router.transitionTo.calledOnce).to.equal(true)
    })
  })

  describe('overlay states', () => {

    it('should change state.hasMouseOver when mouseEnter div', () => {
      let wrapper = shallow(<DonationWidget {...props} />, { context })
      wrapper.simulate('mouseEnter')
      expect(wrapper.state().hasMouseOver).to.equal(true)
    })

    it('should change state.hasMouseOver when mouseLeave div', () => {
      let wrapper = shallow(<DonationWidget {...props} />, { context })
      wrapper.setState({ hasMouseOver: true })
      wrapper.simulate('mouseLeave')
      expect(wrapper.state().hasMouseOver).to.equal(false)
    })
  })
})
