import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { MobilizationPage } from '../../pages/mobilization-page'


describe('<MobilizationPage />', () => {

  const defaultProps = {
    mobilization: {}
  }

  it('render without crashed', () => {
    const wrapper = mount(<MobilizationPage {...defaultProps} />)
  })
})
