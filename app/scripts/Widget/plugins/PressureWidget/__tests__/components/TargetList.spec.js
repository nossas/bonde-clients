import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { TargetList } from '../../components'


describe('<TargetList />', () => {
  let component

  beforeEach(() => {
    component = mount(<TargetList />)
  })

  it('should render ok by default', () => {
    expect(component).to.be.ok
    expect(component.find('.target-item').length).to.equal(0)
  })

  it('should render .target-item according targets passed', () => {
    component.setProps({
      targets: [{ name: 'Lorem', image: 'http://pic.k', office: 'ipsum' }]
    })
    expect(component.find('.target-item').length).to.equal(1)
  })

  it('should hidden target with overflowX auto', () => {
    const targets = [{ name: 'Lorem', image: 'http://pic.k', office: 'ipsum' }]
    component.setProps({targets: targets})

    expect(component.find('.target-list > div').props().style.overflowX).to.equal('auto')
    expect(component.find('.target-list > div > div').props().style.width).to.equal(`${240 * targets.length}px`)
  })
})
