import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import MobilizationsContainer from '~routes/authenticated/mobilizations/container'

describe('routes/authenticated/mobilizations/container', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<MobilizationsContainer {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
