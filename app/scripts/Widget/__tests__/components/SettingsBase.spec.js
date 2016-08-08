import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import * as Paths from '../../../Paths'

import { SettingsBase } from '../../components'


describe('<SettingsBase />', () => {
  let settings
  const props = {
    mobilization: { id: 1 }
  }

  beforeEach(() => {
    settings = mount(<SettingsBase {...props} />)
  })

  it('should closed button with path edit mobilization receive', () => {
    const editMobilizationURL = Paths.editMobilization(props.mobilization.id)
    expect(settings.find('Color').props().path).to.equal(editMobilizationURL)
  })

  it('should render children\'s', () => {
    settings.setProps({
      children: [
        <h1 className='child'>Render child 1</h1>,
        <div  className='child'></div>
      ]
    })
    expect(settings.find('.child').length).to.equal(2)
  })
})
