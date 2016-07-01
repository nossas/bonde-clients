import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import SaveButton from './SaveButton.jsx'

describe('SaveButton', () => {
  let wrapper
  let sandbox

  let props = {
    handleClick: sinon.spy()
  }

  describe('#render', () => {
    before(() => {
      sandbox = sinon.sandbox.create()
    })

    beforeEach(() => {
      wrapper = shallow(<SaveButton {...props} />)
    })

    context('default', () => {
      it(`should render 1 <button>`, () => {
        expect(wrapper.find('button').length).to.equal(1)
      })
      it(`should render <button> with 'Salvar' text inside`, () => {
        expect(wrapper.find('button').text()).to.equal('Salvar')
      })
      it(`should call 'handleClick' event when simulates button click`, () => {
        wrapper.find('button').simulate('click')
        expect(props.handleClick.called).to.be.true
      })
    })

    context('when saving', () => {
      beforeEach(() => {
        wrapper.setProps({ saving: true })
      })

      it(`should render 1 <button>`, () => {
        expect(wrapper.find('button').length).to.equal(1)
      })
      it(`should render <button> with 'Salvando...' text inside`, () => {
        expect(wrapper.find('button').text()).to.equal('Salvando...')
      })
      it(`button should be disabled`, () => {
        expect(wrapper.find('button').props().disabled).to.be.true
      })
    })

    context('when saved', () => {
      beforeEach(() => {
        wrapper.setProps({ saved: true })
      })

      it(`should render 1 <button>`, () => {
        expect(wrapper.find('button').length).to.equal(1)
      })
      it(`should render <button> with 'Salvo' text inside`, () => {
        expect(wrapper.find('button').text()).to.equal('Salvo')
      })
      it(`button should be disabled`, () => {
        expect(wrapper.find('button').props().disabled).to.be.true
      })
    })
  })
})
