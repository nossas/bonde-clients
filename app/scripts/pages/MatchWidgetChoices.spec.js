import React from 'react'

import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as Paths from './../Paths'
import MatchWidgetChoices from './MatchWidgetChoices'

describe('MatchWidgetChoices', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<MatchWidgetChoices />)
  })

  describe('#render', () => {
    it('should render one <TabMenu> component', () => {
      // expect(wrapper.find('TabMenu').length).to.equal(1)
    })
  })
})
