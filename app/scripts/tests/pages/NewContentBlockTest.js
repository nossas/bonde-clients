import React from 'react/addons'
import * as BlockActions from './../../actions/BlockActions'
import { BlockMiniature, ColorPicker } from './../../components'
import NewContentBlock from './../../pages/NewContentBlock.jsx'
import classnames from 'classnames'

const { TestUtils } = React.addons

let container, component, mobilization, dispatch

describe('NewContentBlock', () => {

  before(() => {
    mobilization = { id: 1 }
    dispatch = () => {}
    component = TestUtils.renderIntoDocument(
      <NewContentBlock mobilization={mobilization} dispatch={dispatch} />
    )
  })

  describe('#constructor', () => {
    it('should set initial state', () => {
      expect(component.state).to.eql({
        selectedSizes: [12],
        bgClass: 'bg-1'
      })
    })
  })

  describe('#handleMiniatureClick', () => {
    it('should set selected sizes to the sizes of event current target', () => {
      const event = {currentTarget: {getAttribute() { return '1,2,3' }}}
      component.handleMiniatureClick(event)
      expect(component.state.selectedSizes).to.eql([1, 2, 3])
    })
  })

  describe('#handleColorClick', () => {
    it('should set bg class to the selected bg class event current target', () => {
      const event = {currentTarget: {getAttribute() { return 'bg-purple' }}}
      component.handleColorClick(event)
      expect(component.state.bgClass).to.eql('bg-purple')
    })
  })

  describe('#handleAddBlockClick', () => {
    it('should dispatch add block action', () => {
      const addBlockStub = sinon.stub(BlockActions, 'addBlock')
      component.setState({
        selectedSizes: [68, 69],
        bgClass: 'bg-test'
      })
      component.handleAddBlockClick()
      expect(addBlockStub).to.have.been.calledWith({
        router: component.context.router,
        mobilization_id: mobilization.id,
        bg_class: 'bg-test',
        widgets: [{kind: 'content', size: 68}, {kind: 'content', size: 69}]
      })
    })
  })

  describe('#handleCancelClick', () => {
    it('transition to edit mobilization page', () => {
      component.context.router = { goBack() {} }
      const goBack = sinon.stub(component.context.router, 'goBack')
      component.handleCancelClick()
      expect(goBack).to.have.been.calledOnce
    })
  })

  describe('#render', () => {

    it('should render block miniatures', () => {
      const components = TestUtils.scryRenderedComponentsWithType(component, BlockMiniature)
      expect(components).to.have.length(4)
      components.forEach((miniature) => {
        expect(miniature.props.onClick.toString()).to.equal(component.handleMiniatureClick.bind(component).toString())
      })
    })

    it('should render color picker', () => {
      const components = TestUtils.scryRenderedComponentsWithType(component, ColorPicker)
      expect(components).to.have.length(1)
      expect(components[0].props.onClick.toString()).to.equal(component.handleColorClick.bind(component).toString())
    })

    it('should render add button', () => {
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons).to.have.length(2)
      expect(buttons[0].getDOMNode().textContent.trim()).to.equal('Adicionar')
      expect(buttons[1].getDOMNode().textContent.trim()).to.equal('Cancelar')
      expect(buttons[0].props.onClick.toString()).to.equal(component.handleAddBlockClick.bind(component).toString())
      expect(buttons[1].props.onClick.toString()).to.equal(component.handleCancelClick.bind(component).toString())
    })

  })
})
