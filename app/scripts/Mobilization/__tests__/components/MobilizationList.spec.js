import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'

import MobilizationList from '../../components/MobilizationList'


describe('<MobilizationList />', () => {
  let context = { router: {} }
  let mobilizationList

  beforeEach(() => {
    mobilizationList = shallow(<MobilizationList />, { context })
  })

  it('should total MobilizationCard render equals mobilization passed', () => {
    const mobilizations = [
      {
        id: 1,
        name: 'Lorem ipsum'
      },
      {
        id: 2,
        name: 'Dolor pus'
      }
    ]
    mobilizationList.setProps({mobilizations: mobilizations})
    expect(mobilizationList.find('MobilizationCard').length).to.equal(2)
  })

  it('should render button ADD NEW only passed newMobilizationURL', () => {
    mobilizationList.setProps({newMobilizationURL: () => '/newMob'})
    expect(mobilizationList.find('Link').length).to.equal(1)

    mobilizationList.setProps({newMobilizationURL: undefined})
    expect(mobilizationList.find('Link').length).to.equal(0)
  })
})
