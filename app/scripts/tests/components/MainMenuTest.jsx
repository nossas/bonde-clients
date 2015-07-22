import React from 'react/addons'
import MainMenu from './../../components/MainMenu.jsx'

let { TestUtils } = React.addons

describe('MainMenu', () => {
  it('should render a link to #', () => {
    var component = TestUtils.renderIntoDocument(
      <MainMenu />
    )

    var a = TestUtils.findRenderedDOMComponentWithTag(component, 'a')

    expect(a.getDOMNode().href)
      .to.contain("#")
  })
})
