import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import TabMenuItem from './TabMenuItem.jsx'

describe('TabMenuItem', () => {
  let wrapper

  let props = {
    isActive: true,
    path: '/foo/bar/path',
    text: 'Foo Bar Link Text',
  }
  let activeClassName = 'border-bottom border-aqua bold'

  describe('#render', () => {
    before(() => {
      wrapper = shallow(<TabMenuItem {...props} />)
    })

    context('default', () => {
      it(`should render 1 <li>`, () => {
        expect(wrapper.find('li').length).to.equal(1)
      })
      it(`should render 1 <Link> inside <li>`, () => {
        expect(wrapper.find('li Link').length).to.equal(1)
      })
      it(`<Link> should have expected 'to' props`, () => {
        expect(wrapper.find('li Link').props().to).to.equal(props.path)
      })
      it(`<Link> should have expected children text`, () => {
        expect(wrapper.find('li Link').props().children).to.equal(props.text)
      })
    })

    context('isActive', () => {
      it(`should render active <li> className`, () => {
        expect(wrapper.find('li').props().className).to.have.string(activeClassName)
      })
    })

    context('isActive', () => {
      beforeEach(() => {
        wrapper.setProps({ isActive: false })
      })

      it(`should not render active <li> className`, () => {
        expect(wrapper.find('li').props().className).to.not.have.string(activeClassName)
      })
    })
  })
})
