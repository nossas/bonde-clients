/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Section } from '@mobs/components'
/*import Block from '@/mobrender/components/block.connected'*/

describe('client/mobrender/components/mobilization', () => {
  let blockComponent
  const block = { id: 1 }
  const widgets = [
    { id: 1, kind: 'draft', sm_size: 6, md_size: 6, lg_size: 6, block_id: 1 },
  ]
  const WidgetComponent = ({ widget }) => (
    <p>{widget.kind}</p>
  )
  const props = {
    anchor: `section-${block.id}`,
    editable: true,
    block,
    widgets,
    widgetComponent: WidgetComponent
  }
  const BlockWrapper = ({ children }) => (
    <div id='block-wrapper'>{children}</div>
  )

  beforeEach(() => {
    blockComponent = shallow(<Section {...props} />, { disableLifecycleMethods: true })
  })

  it('should render default a navigation section', () => {
    expect(blockComponent.find(`div#${props.anchor}`).length).to.equal(1)
  })

  it('should render wrapper outside of block when passed by props', () => {
    blockComponent.setProps({ wrapper: BlockWrapper })
    expect(blockComponent.find(BlockWrapper).length).to.equal(1)

    const blockWrapper = blockComponent.find(BlockWrapper)
    expect(blockWrapper.find(`div#${props.anchor}`).length).to.equal(1)
  })

  it('should pass required props to wrapper component', () => {
    blockComponent.setProps({ wrapper: BlockWrapper })
    const blockWrapperProps = blockComponent.find(BlockWrapper).props()
    // use this format because children is passed to wrapper component too
    expect(blockWrapperProps.block).to.deep.equal(props.block)
    expect(blockWrapperProps.editable).to.deep.equal(props.editable)
  })

  it('should render WidgetArea to each widget object', () => {
    expect(blockComponent.find('WidgetArea').length).to.equal(props.widgets.length)
  })
})