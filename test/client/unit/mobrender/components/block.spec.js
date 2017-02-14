import React from 'react'
import { expect } from 'chai' 
import { shallow } from 'enzyme'

import Block from '~client/mobrender/components/block'

describe('~client/mobrender/components/block', () => {

  let block
  const props = {
    block: { id: 1, bg_class: 'bg-1' },
  }
  const blockSelector = `#block-${props.block.id}`

  beforeEach(() => {
    block = shallow(<Block {...props} />)
  })

  it('should render without crashed', () => {
    expect(block).to.be.ok
  })

  it('should make section-id with pattern `block-{id}`', () => {
    expect(block.find(blockSelector).length).to.equal(1)
  })

  it('should call onMouseOver passing key:block id:block.id', () => {
    let result
    block.setProps({ onMouseOver: (key, id) => result = { key, id } })
    block.find(blockSelector).simulate('mouseover')
    expect(result).to.deep.equal({ key: 'block', id: props.block.id })
  })

  it('should call onMouseOut passing key:block', () => {
    let result
    block.setProps({ onMouseOut: key => result = key })
    block.find(blockSelector).simulate('mouseout')
    expect(result).to.equal('block')
  })

  it('should call onCancelEdit when press esc', () => {
    let result
    block.setProps({ onCancelEdit: () => result = true })
    block.find(blockSelector).simulate('keyup', { keyCode: 27 })
    expect(result).to.equal(true)
  })
})
