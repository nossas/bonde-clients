import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as Paths from '../Paths'
import MobilizationCard from './MobilizationCard.jsx'

describe('MobilizationCard', () => {
  let wrapper
  let sandbox

  let props = {
    mobilization: {
      id: 1,
      name: 'Foo Bar Mobilization Name',
      goal: 'Foo Bar Mobilizarion Goal'
    }
  }

  before(() => {
    wrapper = shallow(<MobilizationCard {...props} />)
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#render', () => {
    context('Link', () => {
      it(`should render 1 <Link>`, () => {
        expect(wrapper.find('Link').length).to.equal(1)
      })
      it(`should render <Link> with 'editMobilization' path as 'to' prop`, () => {
        let path = Paths.editMobilization(props.mobilization.id)
        expect(wrapper.find('Link').props().to).to.equal(path)
      })
    })

    context('div', () => {
      let node

      before(() => {
        node = wrapper.find('Link div')
      })

      it(`should render 1 <div> inside <Link>`, () => {
        expect(node.length).to.equal(1)
      })
      it(`should render <div> with 'style' prop as null`, () => {
        expect(node.props().style).to.be.null
      })

      context(`<h3> mobilization name`, () => {
        it(`should render <h3> inside <div>`, () => {
          expect(node.find(`h3`).length).to.equal(1)
        })
        it(`should render <h3> with mobilization name`, () => {
          expect(node.find(`h3`).text()).to.equal(props.mobilization.name)
        })
      })

      context(`<p> mobilization goal`, () => {
        it(`should render <p> inside <div>`, () => {
          expect(node.find(`p`).length).to.equal(1)
        })
        it(`should render <p> with mobilization goal`, () => {
          expect(node.find(`p`).text()).to.equal(props.mobilization.goal)
        })
      })
    })
  })

  describe(`#onMouseOver`, () => {
    let spy = {}

    before(() => {
      spy.setState = sandbox.spy(MobilizationCard.prototype, `setState`)
    })

    beforeEach(() => {
      wrapper.simulate('mouseOver')
    })

    it(`should call 'setState'`, () => {
      expect(spy.setState.called).to.be.true
    })
    it(`should call 'setState' passing 'hasMouseOver' true`, () => {
      let changeStateProps = { hasMouseOver: true }
      expect(spy.setState).to.have.been.calledWith(changeStateProps)
    })
    it(`should set border color on mobilization data div wrapper`, () => {
      expect(wrapper.find(`Link div`).props().style.borderColor).to.be.not.null
    })
  })

  describe(`#onMouseOut`, () => {
    let spy = {}

    before(() => {
      spy.setState = sandbox.spy(MobilizationCard.prototype, `setState`)
    })

    beforeEach(() => {
      wrapper.simulate('mouseOver')
      wrapper.simulate('mouseOut')
    })

    it(`should call 'setState' twice`, () => {
      expect(spy.setState.callCount).to.equal(2)
    })
    it(`should call 'setState' passing 'hasMouseOver' false`, () => {
      let changeStateProps = { hasMouseOver: false }
      expect(spy.setState).to.have.been.calledWith(changeStateProps)
    })
    it(`should remove border color on mobilization data div wrapper`, () => {
      expect(wrapper.find(`Link div`).props().style).to.be.null
    })
  })
})
