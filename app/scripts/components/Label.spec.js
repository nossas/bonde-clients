import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Label from './Label.jsx'

describe('Label', () => {
  let wrapper

  let props = {
    children: 'Foo Bar Label'
  }

  describe('#render', () => {
    before(() => {
      wrapper = shallow(<Label>{props.children}</Label>)
    })

    it('should render 1 label component wrapper element', () => {
      expect(wrapper.find('label').length).to.equal(1)
    })
    it(`should contains '${props.children}' text inside label`, () => {
      expect(wrapper.find('label').text()).to.equal(props.children)
    })

    context('html inside', () => {
      before(() => {
        props.children = (<div>Foo Bar Children Div</div>)
        wrapper = shallow(<Label>{props.children}</Label>)
      })

      it(`should contains 'div' inside label`, () => {
        expect(wrapper.contains(props.children)).to.be.true
      })
      it(`should contains 'Foo Bar Children Div' inside div`, () => {
        expect(wrapper.find('label div').text()).to.equal('Foo Bar Children Div')
      })
    })
  })
})
