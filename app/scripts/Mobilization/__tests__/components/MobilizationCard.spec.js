import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'

import MobilizationCard from '../../components/MobilizationCard'


describe('<MobilizationCard />', () => {
  let props = {
    mobilization: {
      id: 1,
      name: 'Lorem ipsum'
    }
  }
  let context = { router: {} }
  let mobilizationCard

  beforeEach(() => {
    mobilizationCard = shallow(<MobilizationCard {...props} />, { context })
  })

  it('should change state hasMouveOver when mouseOver card', () => {
    mobilizationCard.simulate('mouseOver')
    expect(mobilizationCard.instance().state.hasMouseOver).to.equal(true)
  })

  it('should change state hasMouseOver when mouseOut card', () => {
    mobilizationCard.simulate('mouseOut')
    expect(mobilizationCard.instance().state.hasMouseOver).to.equal(false)
  })

  it('should disabled click Link when editMobilizationURL not passed', () => {
    const link = mobilizationCard.find('Link').at(0)
    expect(link.props().disabled).to.equal(true)
  })

  it('should enabled Link and call redirectToEdit if passed', () => {
    const redirectToEdit = (id) => {
      return `/edit/${id}`
    }
    const mobilizations = [
      {
        id: 1,
        name: 'Lorem ipsum'
      }
    ]
    mobilizationCard.setProps({ mobilizations, redirectToEdit})
    expect(mobilizationCard.find('Link').props().to).to.equal('/edit/1')
  })
})
