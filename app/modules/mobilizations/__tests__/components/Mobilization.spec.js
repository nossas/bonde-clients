import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Mobilization } from '../../components'


describe('<Mobilization />', () => {
  let wrapper
  const props = {
    mobilization: {
      color_scheme: 'meu-rio',
      header_font: 'headerFont',
      body_font: 'bodyFont',
    }
  }

  beforeEach(() => {
    wrapper = mount(<Mobilization {...props} />)
  })

  it('render without crashed', () => {
    expect(wrapper).to.be.ok
  })

  it('renders with color_scheme, header_font, body_font custom by default', () => {
    const { color_scheme, header_font, body_font } = props.mobilization
    const themeClassName = `.${color_scheme}.${header_font}-header.${body_font}-body`
    expect(wrapper.find(`div${themeClassName}`).length).to.equal(1)
  })

  describe('when is editable', () => {

    beforeEach(() => {
      wrapper.setProps({ editable: true })
    })

    it('should renders relative layout classNames', () => {
      const layoutClassName = '.flex-auto.relative'
      expect(wrapper.find(`div${layoutClassName}`).length).to.equal(1)
    })
  })

  describe('when isnt editable', () => {

    beforeEach(() => {
      wrapper.setProps({ editable: false })
    })

    it('should renders absolute layout classNames', () => {
      const layoutClassName = '.absolute'
      expect(wrapper.find(`div${layoutClassName}`).length).to.equal(1)
    })
  })
})
