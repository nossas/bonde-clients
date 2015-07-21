import React from 'react/addons'
import { Block, Widget } from './../../components'

let { TestUtils } = React.addons

let widget1, widget2, allWidgets, blockWidgets, block

describe('Block', function() {
  before(function(){
    widget1 = { block_id: 1, id: 1, settings: { content: "My widget1" } }
    widget2 = { block_id: 2, id: 2, settings: { content: "My widget2" } }
    allWidgets = [widget1, widget2]
    blockWidgets = [widget1]
    block = { id: 1 }
  })

  describe('#filterWidgets', function(){
    it('should return widgets filtered by block_id', function(){
      const filteredWidgets = Block.prototype.filterWidgets(allWidgets, block)
      expect(filteredWidgets).to.include(widget1)
      expect(filteredWidgets).to.not.include(widget2)
    })
  })

  describe('#renderWidgets', function(){
    it('should return widgets components', function(){
      const renderedWidgets = Block.prototype.renderWidgets(allWidgets)
      expect(renderedWidgets).to.have.length(allWidgets.length)
      assert(TestUtils.isElementOfType(renderedWidgets[0], Widget))
      assert(TestUtils.isElementOfType(renderedWidgets[1], Widget))
    })
  })

  describe('#render', function(){
    it('should render filtered widgets components', function(){
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      const widgetsComponents = TestUtils.scryRenderedComponentsWithType(component, Widget)

      expect(widgetsComponents).to.have.length(blockWidgets.length)
    })

    it('should render buttons', function(){
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons).to.have.length(5)
      expect(buttons[0].getDOMNode().textContent).to.equal('Alterar cor de fundo')
      expect(buttons[1].getDOMNode().textContent).to.equal('Esconder')
      expect(buttons[2].getDOMNode().textContent).to.equal('Remover')
      expect(buttons[3].getDOMNode().textContent).to.equal('▲')
      expect(buttons[4].getDOMNode().textContent).to.equal('▼')
      console.log(buttons[0].getDOMNode().onclick)
    })

    it('should disable move up button when canMoveUp is false', function(){
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} canMoveUp={false} />
      )
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons).to.have.length(5)
      expect(buttons[3].getDOMNode().disabled).to.equal(true)
    })

    it('should not disable move up button when canMoveUp is true', function(){
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} canMoveUp={true} />
      )
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons).to.have.length(5)
      expect(buttons[3].getDOMNode().disabled).to.equal(false)
    })

    it('should disable move down button when canMoveDown is false', function(){
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} canMoveDown={false} />
      )
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons).to.have.length(5)
      expect(buttons[4].getDOMNode().disabled).to.equal(true)
    })

    it('should not disable move down button when canMoveDown is true', function(){
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} canMoveDown={true} />
      )
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons).to.have.length(5)
      expect(buttons[4].getDOMNode().disabled).to.equal(false)
    })
  })
})
