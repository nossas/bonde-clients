import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { SettingsContainer } from '../../../../modules/widgets/containers/settings-container'


describe('app/scripts/Widget/containers/SettingsContainer', () => {
  const props = {
    mobilization: { id: 1 },
    widget: { id: 1 }
  }

  it('should render children with props received', () => {
    const wrapper = mount(
      <SettingsContainer {...props}>
        <span>Hello World!</span>
      </SettingsContainer>
    )
    expect(wrapper.find('span').props().widget).to.deep.equal({ id: 1 })
    expect(wrapper.find('span').props().mobilization).to.deep.equal({ id: 1 })
  })
})
