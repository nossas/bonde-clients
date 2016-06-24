import objectAssign from 'object-assign'
import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { DropDownMenu, DropDownMenuItem } from './../'
import TopMenu from './TopMenu.jsx'

describe('TopMenu', () => {
  const props = {
    auth: { user: 'foobar-user' },
    children: {}
  }

  let wrapper
  let sandbox
  describe('#render', () => {

    before(() => {
      sandbox = sinon.sandbox.create()
      sandbox.spy(TopMenu.prototype, 'renderUserMenu')
    })

    beforeEach(() => {
      wrapper = shallow(<TopMenu { ...props } />)
    })

    after(() => {
      sandbox.restore()
    })

    it('should render .topMenu component wrapper div', () => {
      expect(wrapper.find('div.topMenu').length).to.equal(1)
    })

    it(`it should call 'renderUserMenu()'`, () => {
      expect(TopMenu.prototype.renderUserMenu.called).to.be.true
    })

    context('components', () => {
      describe('when has auth.user prop', () => {
        it('should contains 1 DropDownMenu component', () => {
          expect(wrapper.find('DropDownMenu').length).to.equal(1)
        })
        it('should contains 3 DropDownMenuItem components', () => {
          expect(wrapper.find('DropDownMenuItem').length).to.equal(3)
        })
      })

      describe(`when has'nt auth.user prop`, () => {
        beforeEach(() => {
          wrapper.setProps({ auth: {} })
        })
        it('should not contains DropDownMenu component', () => {
          expect(wrapper.find('DropDownMenu').length).to.equal(0)
        })
        it('should not contains DropDownMenuItem components', () => {
          expect(wrapper.find('DropDownMenuItem').length).to.equal(0)
        })
      })
    })

    context('react-router Link component', () => {
      it('should render react-router Link component', () => {
        expect(wrapper.find('Link').length).to.equal(1)
      })
      it(`should render react-router Link component with expected 'to' prop`, () => {
        expect(wrapper.find('Link').props().to).to.equal('/')
      })
      it(`should render react-router Link component with expected 'className' prop`, () => {
        expect(wrapper.find('Link').props().className).to.have.string('reboo-logo')
      })
    })

    context('i.fa-ellipsis-v', () => {
      it(`should render 'i.fa-ellipsis-v'`, () => {
        expect(wrapper.find('i.fa-ellipsis-v').length).to.equal(1)
      })
    })
  })
})
