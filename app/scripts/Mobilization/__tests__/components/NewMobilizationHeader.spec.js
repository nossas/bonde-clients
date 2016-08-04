import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import * as Paths from '../../../Paths'
import { NewMobilizationHeader } from '../../components'


describe('<NewMobilizationHeader />', () => {
  let newMobilizationHeader

  beforeEach(() => {
    newMobilizationHeader = mount(<NewMobilizationHeader />)
  })

  it('should highlighted name and goal by default', () => {
    const nameAndGoal = newMobilizationHeader.find('ul li').at(0)
    const city = newMobilizationHeader.find('ul li').at(1)
    expect(nameAndGoal.props().className).to.contain('py3 mr3 border-bottom')
    expect(city.props().className).to.contain('muted')
  })

  it('should highlighted name and goal', () => {
    newMobilizationHeader.setProps({
      location: {
        pathname: Paths.newMobilization()
      }
    })
    const nameAndGoal = newMobilizationHeader.find('ul li').at(0)
    const city = newMobilizationHeader.find('ul li').at(1)

    expect(nameAndGoal.props().className).to.contain('py3 mr3 border-bottom')
    expect(city.props().className).to.contain('muted')
  })

  it('should highlighted city', () => {
    newMobilizationHeader.setProps({
      location: {
        pathname: Paths.cityNewMobilization(1)
      }
    })
    const nameAndGoal = newMobilizationHeader.find('ul li').at(0)
    const city = newMobilizationHeader.find('ul li').at(1)

    expect(city.props().className).to.contain('py3 mr3 border-bottom')
    expect(nameAndGoal.props().className).to.contain('muted')
  })

})
