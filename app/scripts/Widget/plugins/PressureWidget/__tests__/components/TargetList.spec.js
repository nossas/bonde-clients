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
      targets: ['Igor Santos <igor@nossascidades.org>']
    })
    expect(component.find('.target-item').length).to.equal(1)
  })

  it('should hidden target with overflowX auto', () => {
    const targets = ['Igor Santos <igor@nossascidades.org>']
    component.setProps({targets: targets})

    expect(component.find('.target-list > div').props().style.overflowX).to.equal('auto')
    expect(component.find('.target-list > div > div').props().style.width).to.equal(`${180 * targets.length}px`)
  })

  it('should render target parsed to Name <user@host.com>', () => {
    const targets = ['Igor Santos <igor@nossascidades.org>']
    component.setProps({targets: targets})

    expect(component.find('.target-item span').at(0).text()).to.equal('Igor Santos')
    expect(component.find('.target-item span').at(1).text()).to.equal('igor@nossascidades.org')
  })
})
