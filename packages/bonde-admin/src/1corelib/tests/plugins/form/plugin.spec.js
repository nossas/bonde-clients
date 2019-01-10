/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import shallowWithIntl from '@/intl/helpers/shallow-with-intl'
import { FormPlugin } from '@mobs/plugins/form'

describe('@mobs/plugins/form FormPlugin', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {
      settings: {
        finish_message_type: 'share'
      }
    },
    block: {},
    editable: true,
    configurable: true,
    hasNewField: false,
    store: {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {}
    }
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(<FormPlugin {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
