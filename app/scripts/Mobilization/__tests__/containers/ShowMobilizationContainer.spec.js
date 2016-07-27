import React from 'react'

import { expect } from 'chai'
import { mount } from 'enzyme'

import ShowMobilizationContainer from '../../containers/ShowMobilizationContainer'


describe('<ShowMobilizationContainer />', () => {
  let props = {
    mobilization: {}
  }
  let showMobilizationContainer

  beforeEach(() => {
    showMobilizationContainer = mount(<ShowMobilizationContainer {...props} />)
  })

  it('should render its ok', () => {
    expect(showMobilizationContainer).to.be.ok
  })

  it('should contain style header and body agree mobilization', () => {
    showMobilizationContainer.setProps({
      mobilization: {
        header_font: 'ubuntu',
        body_font: 'open-sans'
      }
    })
    const headerFont = showMobilizationContainer.find('.ubuntu-header')
    expect(headerFont.length).to.equal(1)
    const bodyFont = showMobilizationContainer.find('.open-sans-body')
    expect(bodyFont.length).to.equal(1)
  })

  it('should contain colorScheme agree mobilization', () => {
    showMobilizationContainer.setProps({
      mobilization: {
        color_scheme: 'meurio-scheme',
      }
    })
    const colorScheme = showMobilizationContainer.find('.meurio-scheme')
    expect(colorScheme.length).to.equal(1)
  })

  it('should render blocks received by props', () => {
    const blocksProps = [
      {
        id: 1,
        bg_class: 'bg-1'
      },
      {
        id: 2,
        bg_class: 'bg-1'
      },
    ]
    showMobilizationContainer.setProps({blocks: blocksProps})
    const blocks = showMobilizationContainer.find('BlockContainer')
    expect(blocks.length).to.equal(2)
  })

  it('should render blocks order by position', () => {
    const blocksProps = [
      {
        id: 1,
        bg_class: 'bg-1',
        position: 2
      },
      {
        id: 2,
        bg_class: 'bg-1',
        position: 1
      },
    ]
    showMobilizationContainer.setProps({blocks: blocksProps})
    const block = showMobilizationContainer.find('BlockContainer').at(0)
    expect(block.props().block.position).to.equal(1)
  })

  it('should not render block when block.hidden and editable is false', () => {
    const blocksProps = [
      {
        id: 1,
        bg_class: 'bg-1',
        position: 1,
        hidden: true
      },
    ]
    showMobilizationContainer.setProps({blocks: blocksProps})
    const blocks = showMobilizationContainer.find('BlockContainer')
    expect(blocks.length).to.equal(0)
  })

  it('should render block when block.hidden and editable is true', () => {
    const blocksProps = [
      {
        id: 1,
        bg_class: 'bg-1',
        position: 1,
        hidden: true
      },
    ]
    showMobilizationContainer.setProps({blocks: blocksProps, editable: true})
    const blocks = showMobilizationContainer.find('BlockContainer')
    expect(blocks.length).to.equal(1)
  })
})
