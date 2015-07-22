import React from 'react/addons'
import WYSIHTMLToolbar from './../../components/WYSIHTMLToolbar.jsx'

let { TestUtils } = React.addons
let component

describe('WYSIHTMLToolbar', function() {
  before(function(){
    component = TestUtils.renderIntoDocument(
      <WYSIHTMLToolbar elementId="some-id" className="some-class" />
    )
  })

  describe('#render', function(){
    it('should set the element id', function(){
      const divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
      expect(divs[0].getDOMNode().id).to.be.eql("some-id")
    })

    it('should set the element classes', function(){
      const divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
      expect(divs[0].getDOMNode().className).to.be.eql("some-class")
    })
  })
})
