import React from 'react/addons'
import classnames from 'classnames'
import { Block } from './../../components'
import * as EditMobilizationImport from './../../pages/EditMobilization.jsx'

const EditMobilization = EditMobilizationImport.WrappedComponent
const { TestUtils } = React.addons

let block1
let block2
let blocks
let mobilization
let dispatch

describe('EditMobilization', () => {
  before(() => {
    block1 = { position: 0, id: 1 }
    block2 = { position: 1, id: 2 }
    blocks = {data: [block1, block2]}
    mobilization = { color_scheme: 'meurio-scheme' }
    dispatch = () => {}
  })

  describe('#render', () => {
    let component

    before(() => {
      component = TestUtils.renderIntoDocument(
        <EditMobilization mobilization={mobilization} blocks={blocks} widgets={{data: []}} dispatch={dispatch} />
      )
    })

    it('should render blocks', () => {
      const blocksComponents = TestUtils.scryRenderedComponentsWithType(component, Block)
      expect(blocksComponents).to.have.length(blocks.data.length)
    })

    it('should apply mobilization classes', () => {
      const { color_scheme } = mobilization
      const div = TestUtils.scryRenderedDOMComponentsWithClass(component, classnames(color_scheme))
      expect(div).to.have.length(1)
    })
  })
})
