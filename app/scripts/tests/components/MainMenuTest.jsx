import React from 'react/addons'
import MainMenu from './../../components/MainMenu.jsx'

let { TestUtils } = React.addons

describe('MainMenu', function() {
  it('should render a link to #', function(){
    var component = TestUtils.renderIntoDocument(
      <MainMenu />
    )

    var a = TestUtils.findRenderedDOMComponentWithTag(component, 'a')

    expect(a.getDOMNode().href)
      .to.contain("#")
  })
})
