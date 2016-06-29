import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as Paths from '../Paths'
import MobilizationMenu from './MobilizationMenu.jsx'

describe('MobilizationMenu', () => {
  let wrapper
  let sandbox

  let props = {
    mobilization: {
      id: 1,
      name: 'Foo Bar Mobilization Name'
    }
  }

  before(() => {
    wrapper = shallow(<MobilizationMenu {...props} />)
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#render', () => {
    context('html', () => {
      it(`should render 3 <div>`, () => {
        expect(wrapper.find('div').length).to.equal(3)
      })

      context('h6', () => {
        it(`should render 2 <h6>`, () => {
          expect(wrapper.find('h6').length).to.equal(2)
        })
        it(`should render first <h6> with Edit Mobilization page text`, () => {
          expect(wrapper.find('h6').at(0).text()).to.equal('Edição da página')
        })
        it(`should render second <h6> with Show Mobilization page text`, () => {
          expect(wrapper.find('h6').at(1).text()).to.equal('Visualização da página')
        })
      })

      context('Link', () => {
        it(`should render 4 <Link>`, () => {
          expect(wrapper.find('Link').length).to.equal(4)
        })

        context('Edit Mobilization', () => {
          let node
          before(() => { node = wrapper.find('Link').at(0) })

          it(`should render with Edit Mobilization path 'to' prop`, () => {
            expect(node.props().to).to.equal(Paths.editMobilization(props.mobilization.id))
          })
          it(`should render with mobilization name 'children' prop`, () => {
            expect(node.props().children).to.equal(props.mobilization.name)
          })
        })

        context('Basics Mobilization', () => {
          let node
          before(() => { node = wrapper.find('Link').at(1) })

          it(`should render with Basics Mobilization path 'to' prop`, () => {
            expect(node.props().to).to.equal(Paths.basicsMobilization(props.mobilization.id))
          })
        })

        context('New Mobilization Block', () => {
          let node
          before(() => { node = wrapper.find('Link').at(2) })

          it(`should render with New Mobilization Block path 'to' prop`, () => {
            expect(node.props().to).to.equal(Paths.newMobilizationBlock(props.mobilization.id))
          })
          it(`should contains block content text 'children' prop`, () => {
            expect(node.props().children.join('')).to.have.string('Bloco de conteúdo')
          })
        })

        context('Edit Style', () => {
          let node
          before(() => { node = wrapper.find('Link').at(3) })

          it(`should render with Fonts Mobilization path 'to' prop`, () => {
            expect(node.props().to).to.equal(Paths.fontsMobilization(props.mobilization.id))
          })
          it(`should contains edit style text 'children' prop`, () => {
            expect(node.props().children.join('')).to.have.string('Editar Estilo')
          })
        })
      })

      context('anchor', () => {
        let spy = {}
        let node

        before(() => {
          node = wrapper.find('a')
          spy.handleBlankTarget = sandbox.spy(MobilizationMenu.prototype, `handleBlankTarget`)
        })

        it(`should render 1 <a>`, () => {
          expect(node.length).to.equal(1)
        })
        it(`should render with Mobilization path 'href' prop`, () => {
          expect(node.props().href).to.equal(Paths.mobilization(props.mobilization))
        })
        it(`should render with see in another tab 'children' prop`, () => {
          expect(node.props().children.join('')).to.have.string('Ver em uma nova aba')
        })
        it(`'onClick' prop should be a function`, () => {
          expect(node.props().onClick).to.be.a.function
        })
      })
    })
  })

  describe('#handleBlankTarget', () => {
    let spy = {}
    let mockEvent = {
      preventDefault() {},
      currentTarget: {
        getAttribute() { return Paths.mobilization(props.mobilization) }
      }
    }

    before(() => {
      spy.open = sandbox.spy(window, `open`)
      sandbox.stub(MobilizationMenu.prototype, 'makeHref')

      wrapper.find('a').simulate(`click`, mockEvent)
    })

    it(`should call window.open when simulates anchor click event`, () => {
      expect(spy.open.calledOnce).to.be.true
    })
  })
})
