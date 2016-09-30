import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { expect } from 'chai'

import * as Paths from '../../../../../Paths'
import { ChoicesPage } from '../../pages'

describe('Match/pages/ChoicesPage', () => {
  let wrapper

  let props = {
    params: { widget_id: '1' },
    auth: { credentials: {} },
    dispatch: () => {},
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

  beforeEach(() => {
    wrapper = mount(<ChoicesPage { ...props } />, { context: _context })
  })

  describe('#render', () => {
    it('should render two <div>.flex-auto component wrapper', () => {
      expect(wrapper.find('div.flex-auto').length).to.equal(2)
    })

    it('should render one <MatchPage> component', () => {
      expect(wrapper.find('MatchPage')).to.have.length(1)
    })

    context('Title', () => {
      it('should render <h1>', () => {
        expect(wrapper.find('h1')).to.have.length(1)
      })
      it('should render <h1> with expected content', () => {
        const expectedTitle = 'Configure as combinações da sua ação'
        expect(wrapper.find('h1').text()).to.equal(expectedTitle)
      })
    })

    context('Tabs', () => {
      it('should render one <Tabs> component', () => {
        expect(wrapper.find('Tabs').length).to.equal(1)
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
      ChoicesPage.prototype.props = props
    })

    after(() => {
      ChoicesPage.prototype.props = undefined
    })

    it('should return current widget object', () => {
      let result = ChoicesPage.prototype.widget(props)
      let expectedWidget = props.widgets.data[0]
      expect(result).to.deep.equal(expectedWidget)
    })
    it('should return current widget object if not pass any param', () => {
      let result = ChoicesPage.prototype.widget()
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
      wrapper = mount(<ChoicesPage {...props}  />, { context: _context })
      wrapper.find('.choices-block a').at(0).simulate('click')
      expect(wrapper.instance().state.choicesa.length).to.equal(2)
    })

    it('should render error when submit form and title_text empty', () => {
      props.widgets = {
        data: [{
          id: 1, settings: { 'title_text': '', 'choices1': '1', 'choicesA': 'A' }
        }]
      }
      wrapper = mount(<ChoicesPage {...props}  />, { context: _context })
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
      wrapper = mount(<ChoicesPage {...props}  />, { context: _context })
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
      wrapper = mount(<ChoicesPage {...props}  />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(1)
    })

    it('should render all the errors when submit form and empty states', () => {
      props.widgets = {
        data: [{id: 1, settings: {}}]
      }
      wrapper = mount(<ChoicesPage {...props}  />, { context: _context })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.red').length).to.equal(3)
    })
  })
})
