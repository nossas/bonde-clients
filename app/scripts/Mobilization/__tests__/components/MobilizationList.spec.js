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

  //
  // TODO: Write MobilizationListItem tests.
  //
})
