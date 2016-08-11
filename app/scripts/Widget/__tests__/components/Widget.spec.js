import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import Widget from './../../'

describe('<Widget />', () => {
  let widget
  let props = {
    widget: {
      id: 1
    }
  }

  beforeEach(() => {
    widget = mount(<Widget {...props} />)
  })

  it('should render DrafWidget by default', () => {
    expect(widget.find('.widget').length).to.equal(1)
  })

  it('should throw Error when kind not exists in Widget/plugins', () => {
    widget.setProps({ widget: { id: 1, kind: 'non' } })
    expect(widget.find('span').text()).to.contain('not found')
  })
})
