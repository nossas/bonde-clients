import React from 'react'

import sinon from 'sinon'
import { render, shallow, mount } from 'enzyme'
import { expect } from 'chai'

import * as Paths from './../../Paths'
import Choices from './Choices'

describe('Choices', () => {
  let wrapper

  let props = {
    params: { widget_id: '1' },
    mobilization: { id: 1 },
    widgets: { data: [{ id: 1, settings: {} }] },
    location: { pathname: Paths.matchChoicesMobilizationWidget(1, 1) }
  }

  const _context = {
    router: {
      makeHref: sinon.stub(),
      isActive: sinon.stub()
    }
  }

  const CHOICES_TABMENUITEM = 0
  const GOALS_TABMENUITEM = 1

  beforeEach(() => {
    wrapper = mount(<Choices { ...props } />, { context: _context })
  })

  describe('#render', () => {
    it('should render two <div>.flex-auto component wrapper', () => {
      expect(wrapper.find('div.flex-auto').length).to.equal(2)
    })

    it('should render one <MatchPage> component', () => {
      expect(wrapper.find('MatchPage')).to.have.length(1)
    })

    context('TabMenu', () => {
      it('should render one <TabMenu> component', () => {
        expect(wrapper.find('TabMenu').length).to.equal(1)
      })
      it('should render <TabMenu> with expected title prop', () => {
        const expectedTitle = 'Configure as combinações da sua ação'
        expect(wrapper.find('TabMenu').props().title).to.equal(expectedTitle)
      })
    })

    context('TabMenuItem', () => {
      let node
      beforeEach(() => {
        node = wrapper.find('TabMenuItem')
      })

      it('should render two <TabMenuItem> components', () => {
        expect(node.length).to.equal(2)
      })

      context('Choices Tab', () => {
        it('should render with choices path as path prop', () => {
          const expectedPath = Paths.matchChoicesMobilizationWidget(1, 1)
          expect(node.at(CHOICES_TABMENUITEM).props().path).to.equal(expectedPath)
        })
        it('should render with expected text prop', () => {
          const expectedText = 'Opções de combinação'
          expect(node.at(CHOICES_TABMENUITEM).props().text).to.equal(expectedText)
        })
        it('should render isActive prop as true if current location is equal to choices tab path', () => {
          wrapper.setProps({
            location: { pathname: Paths.matchChoicesMobilizationWidget(1, 1) }
          })
          expect(node.at(CHOICES_TABMENUITEM).props().isActive).to.be.true
        })
        it('should render isActive prop as false if current location is different to choices tab path', () => {
          wrapper.setProps({
            location: { pathname: Paths.matchGoalsMobilizationWidget(1, 1) }
          })
          expect(node.at(CHOICES_TABMENUITEM).props().isActive).to.be.false
        })
      })

      context('Goals Tab', () => {
        it('should render with goals path as path prop', () => {
          const expectedPath = Paths.matchGoalsMobilizationWidget(1, 1)
          expect(node.at(GOALS_TABMENUITEM).props().path).to.equal(expectedPath)
        })
        it('should render with expected text prop', () => {
          const expectedText = 'Resultados das combinações'
          expect(node.at(GOALS_TABMENUITEM).props().text).to.equal(expectedText)
        })
        it('should render isActive prop as true if current location is equal to choices tab path', () => {
          wrapper.setProps({
            location: { pathname: Paths.matchGoalsMobilizationWidget(1, 1) }
          })
          expect(node.at(GOALS_TABMENUITEM).props().isActive).to.be.true
        })
        it('should render isActive prop as false if current location is different to choices tab path', () => {
          wrapper.setProps({
            location: { pathname: Paths.matchChoicesMobilizationWidget(1, 1) }
          })
          expect(node.at(GOALS_TABMENUITEM).props().isActive).to.be.false
        })
      })
    })

    context('CloseButton', () => {
      it('should render one <CloseButton> component', () => {
        ////
        // Validar de uma forma melhor, buscando por <CloseButton>
        // Por algum motivo, não é possível encontrar o componente
        // procurando desta forma.
        // Seria bom poder encontrar o componente desta forma,
        // para poder validar os props passados.
        ////
        expect(wrapper.find('.fa-close').length).to.equal(1)
      })
    })
  })

  describe('#widget', () => {
    before(() => {
      Choices.prototype.props = props
    })

    after(() => {
      Choices.prototype.props = undefined
    })

    it('should return current widget object', () => {
      let result = Choices.prototype.widget(props)
      let expectedWidget = props.widgets.data[0]
      expect(result).to.deep.equal(expectedWidget)
    })
    it('should return current widget object if not pass any param', () => {
      let result = Choices.prototype.widget()
      let expectedWidget = props.widgets.data[0]
      expect(result).to.deep.equal(expectedWidget)
    })
  })

  describe('#validate', () => {

    it('should remove item on state when clicked column', () => {
      props.widgets = {
        data: [{
          id: 1, settings: { 'title_text': '', 'choices1': '1,2,3', 'choicesA': 'A,B' }
        }]
      }
      wrapper = mount(<Choices {...props}  />, { context: _context })
      wrapper.find('.choices-block a').at(0).simulate('click')
      expect(wrapper.instance().state.choicesa.length).to.equal(2)
    })

    it('should render error when submit form and title_text empty', () => {
      props.widgets = {
        data: [{
          id: 1, settings: { 'title_text': '', 'choices1': '1', 'choicesA': 'A' }
        }]
      }
      wrapper = mount(<Choices {...props}  />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(1)
    })

    it('should render error when submit form and side a empty', () => {
      props.widgets = {
        data: [{
          id: 1,
          settings: { 'title_text': 'lorem', 'choices1': '', 'choicesA': 'A' }
        }]
      }
      wrapper = mount(<Choices {...props}  />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(1)
    })

    it('should render error when submit form and side b is empty', () => {
      props.widgets = {
        data: [{
          id: 1,
          settings: { 'title_text': 'lorem', 'choices1': '1', 'choicesA': '' }
        }]
      }
      wrapper = mount(<Choices {...props}  />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(1)
    })

    it('should render all the errors when submit form and empty states', () => {
      props.widgets = {
        data: [{id: 1, settings: {}}]
      }
      wrapper = mount(<Choices {...props}  />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(3)
    })
  })
})
