import React from 'react'

import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import WYSIHTMLToolbarInsertHTML from './WYSIHTMLToolbarInsertHTML'


describe('WYSIHTMLToolbarInsertHTML', () => {

  const insertHTMLIndex = 0
  const cancelButtonIndex = 1

  it('should set state.insertHTMLContent when change input', () => {
    let wrapper = shallow(<WYSIHTMLToolbarInsertHTML />)
    let inputHtml = wrapper.find('input').at(0)
    inputHtml.simulate('change', { target: { value: 'test' } })

    expect(wrapper.instance().state.insertHTMLContent).to.equal('test')
  })

  it('should render a with command and command value wysihtml5 config', () => {
    let wrapper = shallow(<WYSIHTMLToolbarInsertHTML />)
    wrapper.setState({ 'insertHTMLContent': 'test' })

    let insertHtml = wrapper.find('a').at(insertHTMLIndex)

    expect(insertHtml.prop('data-wysihtml5-command')).to.equal('insertHTML')

    let insertHTMLContent = wrapper.instance().state.insertHTMLContent
    expect(insertHtml.prop('data-wysihtml5-command-value')).to.equal(insertHTMLContent)
  })
})
