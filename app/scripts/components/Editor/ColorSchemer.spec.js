import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import ColorSchemer from './ColorSchemer.jsx'

describe('ColorSchemer', () => {
  let wrapper
  let props = {
    onChange() {}
  }

  beforeEach(() => {
    wrapper = mount(<ColorSchemer { ...props } />)
  })

  describe('#render', () => {
    it('should render react color picker panel', () => {
      expect(wrapper.find('.react-colorpicker-panel').length).to.equal(1)
    })
  })
})
