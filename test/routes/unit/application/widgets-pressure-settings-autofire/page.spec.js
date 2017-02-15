import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~utils/mock'
import WidgetsPressureSettingsAutofirePage from '~routes/application/widgets-pressure-settings-autofire/page'

describe('routes/application/widgets-pressure-settings-autofire/page', () => {
  let wrapper
  const props = {
    fields: {
      sender_name: {},
      sender_email: {},
      email_subject: {},
      email_text: {}
    },
    mobilization: { id: 1 },
    widget: { kind: 'pressure' },
    // Actions
    asyncWidgetUpdate: mock.noop
  }

  beforeAll(() => {
    wrapper = shallow(<WidgetsPressureSettingsAutofirePage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
