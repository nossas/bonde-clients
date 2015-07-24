import React from 'react/addons'
import { DropDownMenuItem } from './../../components'

const { TestUtils } = React.addons

let component, clickString

const onClick = () => { clickString = clickString + 'bar' }
const onItemClick = () => { clickString = 'foo' }
const props = {disabled: false, onClick: onClick, onItemClick: onItemClick}

describe('DropDownMenuItem', () => {
  describe('#handleClick', () => {
    it('should call both onItemClick and onClick', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} />
      )
      component.handleClick()
      expect(clickString).to.be.equal('foobar')
    })
  })

  describe('#render', () => {
    it('should render enabled and bind onClick event', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} />
      )
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button')
      expect(button.getDOMNode().getAttribute('disabled')).to.be.null
      expect(button.props.onClick.toString()).to.equal(component.handleClick.bind(component).toString())
    })

    it('should render disabled', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} disabled={true} />
      )
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button')
      expect(button.getDOMNode().getAttribute('disabled')).not.to.be.null
    })
  })
})
