import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import WidgetsPressureSettingsFinishPage from '~routes/application/widgets-pressure-settings-finish/page'

describe('routes/application/widgets-pressure-settings-finish/page', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<WidgetsPressureSettingsFinishPage />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
