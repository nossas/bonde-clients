import React from 'react'
import { shallow } from 'enzyme'

import Block from './block'

describe('package/components/block', () => {
  let block
  beforeEach(() => {
    block = shallow(<Block />)
  })

  it('should set id in block to navigation menu', () => {
    const id = 1
    block.setProps({ block: { id } })
    expect(block.find('div').props().id).to.equal(`block-${id}`)
  })

  it('should set style with background color', () => {
    const bg_class = '{"r":"255","g":"0","b":"0","a":".5"}'
    block.setProps({ block: { bg_class } })
    expect(block.find('div').props().style).to.deep.equal({
      backgroundColor: 'rgba(255,0,0,.5)'
    })
  })

  it('should set style with background image', () => {
    const bg_image = 'http://pick.it.png' 
    const bg_class = '{"r":"255","g":"0","b":"0","a":".5"}'
    // same with bg_class setted, bg_image has preference
    block.setProps({ block: { bg_image, bg_class } })
    expect(block.find('div').props().style).to.deep.equal({
      background: `url('${bg_image}') no-repeat`,
      backgroundSize: 'cover'
    })
  })

  it('should set className if bgClass to be a css class', () => {
    const bg_class = 'bg-gray'
    block.setProps({ block: { bg_class } })
    expect(block.find('div').props().className).to.equal(bg_class)
    expect(block.find('div').props().style).to.equal(undefined)
  })
})
