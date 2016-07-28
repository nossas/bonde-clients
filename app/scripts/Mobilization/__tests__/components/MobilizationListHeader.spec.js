import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'

import MobilizationListHeader from '../../components/MobilizationListHeader'


describe('<MobilizationListHeader />', () => {
  const context = { router: {} }
  let header

  beforeEach(() => {
    header = shallow(<MobilizationListHeader />, { context })
  })

  it('should hide button add mob by default', () => {
    expect(header.find('Link').length).to.equal(0)
  })

  it('should show add button when redirectToAdd pass', () => {
    header.setProps({
      redirectToAdd: () => {
        return '/mobilization'
      }
    })
    expect(header.find('Link').length).to.equal(1)
    expect(header.find('Link').props().to).to.equal('/mobilization')
  })

  it('should hide add button when redirectToAdd not is passed', () => {
    header.setProps({
      redirectToAdd: undefined,
    })
    expect(header.find('Link').length).to.equal(0)
  })
})
