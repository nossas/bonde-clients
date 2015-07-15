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
    it('should return filtered widgets components', function(){
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      const widgetsComponents = TestUtils.scryRenderedComponentsWithType(component, Widget)

      expect(widgetsComponents).to.have.length(blockWidgets.length)
    })
  })
})
