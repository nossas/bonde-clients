import React, { PropTypes } from 'react'
import * as Paths from './../../Paths'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { FacebookShareButton, TwitterShareButton } from './../'
import TellAFriend from './TellAFriend.jsx'

describe('TellAFriend', () => {
  const props = {
    mobilization: {
      custom_domain: 'foo-bar.com',
      twitter_share_text: 'Foo Bar Share!'
    },
    message: 'Foo Bar Tell a Friend'
  }

  let wrapper
  describe('#render', () => {
    before(() => {
      wrapper = shallow(<TellAFriend { ...props } />)
    })

    context('html elements', () => {
      it('should contains 1 .bg-white component wrapper element', () => {
        expect(wrapper.find('.bg-white').length).to.equal(1)
      })
      it('should contains 1 .h3 element', () => {
        let node = wrapper.find('.bg-white .h3')
        expect(node.length).to.equal(1)
        expect(node.text()).to.equal(props.message)
      })
      it('should contains a .h3 element with message', () => {
        let node = wrapper.find('.bg-white .h3')
        expect(node.text()).to.equal(props.message)
      })
      it('should contains 1 .py2 element', () => {
        expect(wrapper.find('.bg-white .py2').length).to.equal(1)
      })
      it('should contains a .py2 element with img', () => {
        expect(wrapper.find('.bg-white .py2 img').length).to.equal(1)
      })
      it('should contains 3 p elements', () => {
        expect(wrapper.find('.bg-white p').length).to.equal(3)
      })
    })

    describe('components', () => {
      context('#FacebookShareButton', () => {
        it('should contains FacebookShareButton', () => {
          expect(wrapper.find('FacebookShareButton').length).to.equal(1)
        })
        it('should have FacebookShareButton href prop ', () => {
          expect(wrapper.find('FacebookShareButton').props().href)
            .to.equal(Paths.mobilization(props.mobilization))
        })
      })

      context('#TwitterShareButton', () => {
        it('should contains TwitterShareButton', () => {
          expect(wrapper.find('TwitterShareButton').length).to.equal(1)
        })
        it('should have TwitterShareButton href prop ', () => {
          expect(wrapper.find('TwitterShareButton').props().href)
            .to.equal(Paths.mobilization(props.mobilization))
        })
        it('should have TwitterShareButton text prop ', () => {
          expect(wrapper.find('TwitterShareButton').props().text)
            .to.equal(props.mobilization.twitter_share_text)
        })
      })
    })
  })
})
