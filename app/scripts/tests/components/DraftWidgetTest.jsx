import React from 'react'
import Router from 'react-router'
import { render, mount, shallow } from 'enzyme'
import { DraftWidget } from './../../components'
import * as Paths from './../../Paths'

const props = {
  dispatch     : () => {},
  auth         : {},
  mobilization : {},
  widget       : {},
  editable     : true
}

describe('DraftWidget', () => {
  describe('#render', () => {
    it('should render a draft widget containing html elements with editable prop enabled', () => {
      props.editable = true
      const component = render(<DraftWidget {...props} />)

      expect(component.find('div.widget').length).to.equal(1)
      expect(component.find('div.widget h4').length).to.equal(1)
      expect(component.find('div.widget button').length).to.equal(3)
    })
  })
})
