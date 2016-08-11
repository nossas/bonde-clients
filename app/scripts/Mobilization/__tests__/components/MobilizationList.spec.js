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

  it('should pass redirectTo to children MobilizationCard', () => {
    const mobilizations = [
      {
        id: 1,
        name: 'Lorem ipsum'
      }
    ]
    const redirectToEdit = (id) => { return `/${id}` }
    mobilizationList.setProps({
      mobilizations: mobilizations,
      redirectToEdit: redirectToEdit
    })
    expect(mobilizationList.find('MobilizationCard').props().redirectToEdit).to.equal(redirectToEdit)
  })
})
