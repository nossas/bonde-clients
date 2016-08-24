import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { MobilizationBasicsFormPage } from '../../pages'


describe('<MobilizationBasicsFormPage />', () => {
  const stubContext = {
    store: {
      getState: () => ({}),
      dispatch: () => {},
      subscribe: () => {},
    }
  }
  let page

  beforeEach(() => {
    page = mount(<MobilizationBasicsFormPage />, { context: stubContext })
  })

  /*it('should render title if mobilization not passed', () => {
    expect(page.find('h3').length).to.equal(1)
  })*/
})
