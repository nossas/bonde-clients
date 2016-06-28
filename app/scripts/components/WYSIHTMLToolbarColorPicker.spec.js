import React from 'react'

import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import WYSIHTMLToolbarColorPicker from './WYSIHTMLToolbarColorPicker.jsx'


describe('WYSIHTMLToolbarColorPicker', () => {

  it('should set state.color when change input color', () => {
    let wrapper = shallow(<WYSIHTMLToolbarColorPicker />)
    let input = wrapper.find('input').at(0)
    input.simulate('change', '#ffffff')

    expect(wrapper.instance().state.color).to.equal('#ffffff')
  })

  it('should  set state.color when change ColorSchemer', () => {
    let wrapper = shallow(<WYSIHTMLToolbarColorPicker />)
    let colorSchemer = wrapper.find('ColorSchemer').at(0)
    colorSchemer.simulate('change', '#ffffff')

    expect(wrapper.instance().state.color).to.equal('#ffffff')
  })

  it('should render a with data-wysihtml5-dialog-action equals "save"', () => {
    let wrapper = shallow(<WYSIHTMLToolbarColorPicker />)
    let node = wrapper.find('a').at(0)

    expect(node.prop('data-wysihtml5-dialog-action')).to.equal('save')
  })
})
