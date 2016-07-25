import React from 'react'

import { expect } from 'chai'
import { mount } from 'enzyme'

import Widget from '../../components/Widget'


describe('<Widget />', () => {

  let props = {
    widget: {
      id: 1,
      kind: 'draft'
    }
  }
  let widget

  beforeEach(() => {
    widget = mount(<Widget {...props} />)
  })

  it('should render DrafWidget by default', () => {
    expect(widget.find('.draft-widget').length).to.equal(1)
  })

  it('should throw Error when kind not exists in Widget/src', () => {
    widget.setProps({ widget: { id: 1, kind: 'non' } })
    expect(widget.find('span').text()).to.contain('not found')
  })
})
