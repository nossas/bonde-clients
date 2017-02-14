import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import WidgetsDonationSettingsFinish from '~routes/application/widgets-donation-settings-finish/page'

describe('routes/application/widgets-donation-settings-finish/page', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<WidgetsDonationSettingsFinish />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
