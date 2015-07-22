import React from 'react/addons'
import WidgetContent from './../../components/WidgetContent.jsx'

let { TestUtils } = React.addons
let widget = {}, component

describe('WidgetContent', function() {
  before(function(){
    component = TestUtils.renderIntoDocument(
      <WidgetContent widget={widget} />
    )
  })

  describe('#handleEditorFocus', function(){
    it("should set state editing to true", function(){
      component.handleEditorFocus()
      expect(component.state.editing).to.be.eql(true)
    })
  })

  describe('#handleOverlayClick', function(){
    it("should set state editing to false", function(){
      component.handleOverlayClick()
      expect(component.state.editing).to.be.eql(false)
    })
  })
})
