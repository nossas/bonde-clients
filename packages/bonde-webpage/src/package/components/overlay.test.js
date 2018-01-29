import React from 'react'
import { shallow } from 'enzyme'
import Overlay, { OverlayWrapper } from './overlay'


describe('package/components/overlay', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(<Overlay />)
  })
  
  it('default render', () => {
    const overlay = wrapper.find(OverlayWrapper)
    expect(overlay.props().bg).to.equal('rgba(0,0,0,0.5)')
    expect(overlay.props().hover).to.equal(false)
  })

  it('should show overlay when mouseEnter', () => { 
    wrapper.simulate('mouseenter')
    const overlay = wrapper.find(OverlayWrapper)
    expect(overlay.props().hover).to.equal(true)
  })

  it('should hide overlay when mouseLeave', () => {
    wrapper.setState({ hover: true })
    expect(wrapper.find(OverlayWrapper).props().hover).to.equal(true)
    
    wrapper.simulate('mouseleave')
    expect(wrapper.find(OverlayWrapper).props().hover).to.equal(false)
  })

  it('should dispatch onClick', () => {
    let clicked = false
    wrapper.setProps({ onClick: () => { clicked = true } })
    wrapper.simulate('click')
    expect(clicked).to.equal(true)
  })
})
