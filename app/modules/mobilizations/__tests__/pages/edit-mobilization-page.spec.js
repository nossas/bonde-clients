import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { MobilizationEditPage } from '../../pages'


describe('<MobilizationEditPage />', () => {

  it('render without crashed', () => {
    const wrapper = mount(<MobilizationEditPage />)
  })
})
