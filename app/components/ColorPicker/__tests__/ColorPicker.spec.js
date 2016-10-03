import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { ColorPicker } from '../ColorPicker'

describe('app/components/ColorPicker/ColorPicker', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  before(() => {
    wrapper = shallow(<ColorPicker {...props} />)
  })

  describe('#render', () => {
    it('should render the component without error by default', () => {
      expect(wrapper).to.be.ok
    })
    it('should render with "color" prop as #333 by default', () => {
      expect(wrapper.props().color).to.be.equal('#333')
    })
    it('should render with "presetColors" prop as an empty array by default', () => {
      expect(wrapper.props().presetColors).to.be.an.emptyArray
    })
    it('should render with "onChangeComplete" prop as a function by default', () => {
      expect(wrapper.props().onChangeComplete).to.be.a.function
    })
    it('should render with "className" prop as custom', () => {
      const customClassName = 'Foo Bar'
      wrapper.setProps({ ...props, className: customClassName })
      expect(wrapper.props().className).to.be.equal(customClassName)
    })
    it('should render with "presetColors" prop as a not empty array if it is a valid theme', () => {
      const theme = 'meurio'
      wrapper.setProps({ ...props, theme })
      expect(wrapper.props().presetColors).to.not.be.an.emptyArray
    })
    it('should render with "presetColors" prop as an empty array if it is a invalid theme', () => {
      const theme = 'foo'
      wrapper.setProps({ ...props, theme })
      expect(wrapper.props().presetColors).to.be.an.emptyArray
    })
  })
})
