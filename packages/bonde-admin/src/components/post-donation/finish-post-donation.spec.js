/* eslint-disable no-unused-expressions */
// import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { FinishPostDonation } from './index'

describe('client/components/share/finish-post-donation', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    href: 'http://foo.bar',
    widget: { kind: 'donation' }
  }

  beforeAll(() => {
    wrapper = shallow(<FinishPostDonation {...props} />)
  })

  describe('#render', () => {
    xit('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
