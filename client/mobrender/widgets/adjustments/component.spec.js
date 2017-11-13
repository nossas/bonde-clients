import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import AdjustmentsSettingsForm from './component'

describe('<AdjustmentsSettingsForm />', () => {
  let wrapper
  const props = {
    fields: {
      call_to_action: 'callToAction',
      button_text: 'buttonText',
      count_text: 'countText',
      main_color: 'mainColor'
    },
    handleSubmit: mock.noop,
    submitting: false,
    error: undefined,
    colorScheme: '#c7c7c7',
    widget: {},
    asyncWidgetUpdate: mock.noop
  }

  beforeAll(() => {
    wrapper = shallow(<AdjustmentsSettingsForm {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok
    })
  })
})
