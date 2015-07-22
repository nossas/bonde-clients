import React from 'react/addons'
import { Block } from './../../components'
import * as PageEditImport from './../../pages/PageEdit.jsx'
import classnames from 'classnames'

const PageEdit = PageEditImport.DecoratedComponent
const { TestUtils } = React.addons

let block1, block2, disorderlyBlocks, orderlyBlocks, mobilization, dispatch

describe('PageEdit', function() {
  before(function(){
    block1 = { position: 0, id: 1 }
    block2 = { position: 1, id: 2 }
    orderlyBlocks = [block1, block2]
    disorderlyBlocks = [block2, block1]
    mobilization = { color_scheme: "meurio-scheme", font_set: "brush-up" }
    dispatch = function(){}
  })

  describe('#render', function(){
    let component

    before(function(){
      component = TestUtils.renderIntoDocument(
        <PageEdit mobilization={mobilization} blocks={orderlyBlocks} widgets={[]} dispatch={dispatch} />
      )
    })

    it('should render blocks', function(){
      const blocksComponents = TestUtils.scryRenderedComponentsWithType(component, Block)
      expect(blocksComponents).to.have.length(orderlyBlocks.length)
    })

    it('should apply mobilization classes', function(){
      const { color_scheme, font_set } = mobilization
      const div = TestUtils.scryRenderedDOMComponentsWithClass(component, classnames(color_scheme, font_set))
      expect(div).to.have.length(1)
    })
  })
})
