import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page'

describe('routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page', () => {
  let wrapper
  const props = {
    mobilization: { color_scheme: 'meurio-scheme' },
    widget: {},
    asyncWidgetUpdate: mock.noop,
    fields: {
      show_counter: { value: true }
    },
    handleSubmit: mock.noop,
    submitting: false,
    error: undefined
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok
    })
  })
})
