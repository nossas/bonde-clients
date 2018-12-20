/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Mobilization } from '@mobs'
/*import Block from '@/mobrender/components/block.connected'*/

describe('client/mobrender/components/mobilization', () => {
  let wrapper
  const props = {
    colorScheme: 'meu-rio',
    headerFont: 'headerFont',
    bodyFont: 'bodyFont',
    /*mobilization: {
      color_scheme: 'meu-rio',
      header_font: 'headerFont',
      body_font: 'bodyFont',
      name: 'Lorem',
      goal: 'Lorem ipsum dolor',
      facebook_share_title: 'Facebook share title',
      facebook_share_description: 'Facebook share description',
      facebook_share_image: 'http://facebook.com/share-image.png'
    },*/
/*    blocks: [
      { id: 1, hidden: false, menu_hidden: false, mobilization_id: 1 },
      { id: 2, hidden: true, menu_hidden: true, mobilization_id: 1 }
    ],
    widgets: [
      { id: 1, block_id: 1, kind: 'draft' },
      { id: 2, block_id: 2, kind: 'draft' }
    ],*/
/*    store: mock.store({ auth: { user: { email: 'foo@bar.com' } } })*/
  }

  beforeEach(() => {
    wrapper = shallow(<Mobilization {...props} />, { disableLifecycleMethods: true })
  })

  it('render without crashed', () => {
    expect(wrapper).to.be.ok
  })

  it('renders with color_scheme, header_font, body_font custom by default', () => {
    const { colorScheme, headerFont, bodyFont } = props
    const themeClassName = `.${colorScheme}.${headerFont}-header.${bodyFont}-body`
    expect(wrapper.find(`div${themeClassName}`).length).to.equal(1)
  })

  /*it('renders Navbar with blocks and editable props passed', () => {
    expect(wrapper.find('Navbar').props().blocks).to.equal(props.blocks)
    expect(wrapper.find('Navbar').props().editable).to.equal(props.editable || false)
  })*/

  /*it('should pass widgets filter by block to block component', () => {
    // jump the scroll offset handling
    wrapper.setState({ blocks: props.blocks })

    let expected = props.widgets.filter(w => w.block_id === props.blocks[0].id)
    expect(wrapper.find(Block).at(0).props().widgets).to.deep.equal(expected)

    expected = props.widgets.filter(w => w.block_id === props.blocks[1].id)
    expect(wrapper.find(Block).at(1).props().widgets).to.deep.equal(expected)
  })

  describe('when is editable', () => {
    const editableWrapper = shallow(<Mobilization {...props} editable />, {
      disableLifecycleMethods: true
    })

    it('should renders relative layout classNames', () => {
      const layoutClassName = '.flex-auto.relative'
      const main = editableWrapper.find(`div${layoutClassName}`)
      expect(main.length).to.equal(1)
      expect(main.props().style).to.equal(undefined)
    })

    it('should not render DocumentMeta', () => {
      expect(editableWrapper.find('DocumentMeta').length).to.equal(0)
    })

    it('should render all blocks', () => {
      editableWrapper.setProps({ editable: true })
      expect(editableWrapper.find(Block).length).to.equal(props.blocks.length)
    })
  })*/

  describe('when isnt editable', () => {
    beforeEach(() => {
      wrapper.setProps({ editable: false })
    })

    it('should renders absolute layout classNames', () => {
      const layoutClassName = '.absolute.flex'
      const main = wrapper.find(`div${layoutClassName}`)
      expect(main.length).to.equal(1)
      expect(main.props().style).to.deep.equal({ top: 0, bottom: 0, left: 0, right: 0 })
    })

    /*it('should render only visible blocks', () => {
      const visibleBlocks = props.blocks.filter(b => !b.hidden)
      expect(wrapper.find(Block).length).to.equal(visibleBlocks.length)
    })*/
  })
})
