import React, { PropTypes } from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import InputCounter from './InputCounter.jsx'

describe('InputCounter', () => {
  const props = {
    maxLength: 100,
    length: 10,
    classNames: ['foo-bar-classname']
  }

  let wrapper
  describe('#render', () => {
    before(() => {
      wrapper = shallow(<InputCounter { ...props } />)
    })

    context('html', () => {
      it('should render 1 span', () => {
        expect(wrapper.find('span').length).to.equal(1)
      })
    })

    context('custom class names', () => {
      it('should render span with passed class name', () => {
        expect(wrapper.find('span').props().className).to.have.string(props.classNames[0])
      })
      it('should render span with passed multiple class name', () => {
        const customClassNames = ['foo', 'bar', 'baz']
        wrapper.setProps({ classNames: customClassNames })
        customClassNames.forEach((className) => {
          expect(wrapper.find('span').props().className).to.have.string(className)
        })
      })
    })

    context('inner text', () => {
      it('should contains text of difference between maxLength and length', () => {
        wrapper.setProps({ length: 90 })
        expect(parseInt(wrapper.find(`span`).text())).to.equal(10)
      })
      it('should contains text of negative difference between maxLength and length', () => {
        wrapper.setProps({ length: 150 })
        expect(parseInt(wrapper.find(`span`).text())).to.equal(-50)
      })
    })

    context('\'red\' class name', () => {
      it('should contains \'red\' class if difference between maxLength and length it is equal to 10', () => {
        wrapper.setProps({ length: 90 })
        expect(wrapper.find(`span`).props().className).to.have.string('red')
      })
      it('should contains \'red\' class if difference between maxLength and length it is equal to 0', () => {
        wrapper.setProps({ length: 100 })
        expect(wrapper.find(`span`).props().className).to.have.string('red')
      })
      it('should not contains \'red\' class if difference between maxLength and length it is equal to 11', () => {
        wrapper.setProps({ length: 89 })
        expect(wrapper.find(`span`).props().className).to.not.have.string('red')
      })
      it('should not contains \'red\' class if difference between maxLength and length it is equal to 100', () => {
        wrapper.setProps({ length: 0 })
        expect(wrapper.find(`span`).props().className).to.not.have.string('red')
      })
    })
  })
})
