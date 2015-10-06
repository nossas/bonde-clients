import React from 'react/addons'
import classnames from 'classnames'
import { Block, Navbar } from './../../components'
import * as EditMobilizationImport from './../../pages/EditMobilization.jsx'

const EditMobilization = EditMobilizationImport.WrappedComponent
const { TestUtils } = React.addons

const block1 = { position: 0, id: 1 }
const block2 = { position: 1, id: 2 }
const blocks = { data: [block1, block2], loaded: true }
const mobilization = { color_scheme: 'meurio-scheme' }
const widgets = { data: [] }
const dispatch = () => {}
const mobilizationEditor = { isEditingBlock: false }

function generateComponent(options = {}) {
  return (
    <EditMobilization
      mobilization={options.mobilization || mobilization}
      blocks={options.blocks || blocks}
      widgets={options.widgets || widgets}
      dispatch={options.dispatch || dispatch}
      mobilizationEditor={options.mobilizationEditor || mobilizationEditor}
    />
  )
}

describe('EditMobilization', () => {
  describe('#render', () => {
    let component = TestUtils.renderIntoDocument(generateComponent())

    it('should render blocks', () => {
      const blocksComponents = TestUtils.scryRenderedComponentsWithType(component, Block)
      expect(blocksComponents).to.have.length(blocks.data.length)
    })

    it('should apply mobilization classes', () => {
      const { color_scheme } = mobilization
      const div = TestUtils.scryRenderedDOMComponentsWithClass(component, classnames(color_scheme))
      expect(div).to.have.length(1)
    })

    it('should render the navbar when it is not editing a block', () => {
      component = TestUtils.renderIntoDocument(
        generateComponent({mobilizationEditor: {isEditingBlock: false}})
      )

      const navbarComponent = TestUtils.scryRenderedComponentsWithType(component, Navbar)
      expect(navbarComponent).to.have.length(1)
    })

    it('should not render the navbar when it is editing a block', () => {
      component = TestUtils.renderIntoDocument(
        generateComponent({mobilizationEditor: {isEditingBlock: true}})
      )

      const navbarComponent = TestUtils.scryRenderedComponentsWithType(component, Navbar)
      expect(navbarComponent).to.have.length(0)
    })
  })
})
