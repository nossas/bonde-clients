import React from 'react'

import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import WYSIHTMLToolbarCreateLink from './WYSIHTMLToolbarCreateLink'


describe('WYSIHTMLToolbarCreateLink', () => {

  it('should initialize by default newTab equals "_self"', () => {
    let wrapper = shallow(<WYSIHTMLToolbarCreateLink />)

    expect(wrapper.instance().state.newTab).to.equal('_self')
  })

  it('should change state.newTab to "_blank" if checked input', () => {
    let wrapper = shallow(<WYSIHTMLToolbarCreateLink />)
    let input = wrapper.find('input[type="checkbox"]').at(0)
    input.simulate('change', { target: { checked: true } })

    expect(wrapper.instance().state.newTab).to.equal('_blank')
  })

  it('should render wysihtml5 fields target and href', () => {
    let wrapper = shallow(<WYSIHTMLToolbarCreateLink />)

    let inputHref = wrapper.find('input[type="text"]').at(0)
    expect(inputHref.prop('data-wysihtml5-dialog-field')).to.equal('href')

    let inputTarget = wrapper.find('input[type="checkbox"]').at(0)
    expect(inputTarget.prop('data-wysihtml5-dialog-field')).to.equal('target')
  })

  it('should render link with action save wysihtml5 config', () => {
    let wrapper = shallow(<WYSIHTMLToolbarCreateLink />)
    let node = wrapper.find('a').at(0)
    expect(node.prop('data-wysihtml5-dialog-action')).to.equal('save')
  })
})
