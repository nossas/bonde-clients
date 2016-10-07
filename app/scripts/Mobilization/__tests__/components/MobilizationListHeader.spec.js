import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'

import MobilizationListHeader from '../../components/MobilizationListHeader'


describe('<MobilizationListHeader />', () => {
  const context = { router: {} }
  let wrapper
  const props = {
    location: { pathname: '' }
  }

  beforeEach(() => {
    wrapper = shallow(<MobilizationListHeader {...props} />, { context })
  })

  it('should hide button add mob by default', () => {
    expect(wrapper.find('Link').length).to.equal(0)
  })

  it('should show add button when redirectToAdd pass', () => {
    wrapper.setProps({
      redirectToAdd: () => {
        return '/mobilization'
      }
    })
    expect(wrapper.find('Link').length).to.equal(1)
    expect(wrapper.find('Link').props().to).to.equal('/mobilization')
  })

  it('should hide add button when redirectToAdd not is passed', () => {
    wrapper.setProps({
      redirectToAdd: undefined,
    })
    expect(wrapper.find('Link').length).to.equal(0)
  })

  it('should render one <Tabs> component', () => {
    expect(wrapper.find('Tabs')).to.have.length(1)
  })
})
