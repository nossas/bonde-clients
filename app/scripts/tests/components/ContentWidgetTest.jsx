import React from 'react/addons'
import ContentWidget from './../../components/ContentWidget.jsx'

let { TestUtils } = React.addons
let widget = {}, component

describe('ContentWidget', function() {
  before(function(){
    component = TestUtils.renderIntoDocument(
      <ContentWidget widget={widget} />
    )
  })

  describe('#enableEditor', function(){
    it("should set editing state to true", function(){
      component.enableEditor()
      expect(component.state.editing).to.be.eql(true)
    })

    it("should add a keyup event listener", function(){
      const mockedAddEventListener = sinon.spy()
      sinon.stub(window, 'addEventListener', mockedAddEventListener)
      component.enableEditor()

      mockedAddEventListener.should.have.been.called
    })
  })

  describe('#disableEditor', function(){
    it("should set editing state to false", function(){
      component.disableEditor()
      expect(component.state.editing).to.be.eql(false)
    })

    it("should remove the keyup event listener", function(){
      const mockedRemoveEventListener = sinon.spy()
      sinon.stub(window, 'removeEventListener', mockedRemoveEventListener)
      component.disableEditor()

      mockedRemoveEventListener.should.have.been.called
    })
  })

  describe('#handleEditorFocus', function(){
    it("should set state editing to true", function(){
      component.handleEditorFocus()
      expect(component.state.editing).to.be.eql(true)
    })
  })

  describe('#handleEscapePress', function(){
    it("should save the content if the keyCode is escape", function(){
      const mockedSave = sinon.spy()
      sinon.stub(component, 'save', mockedSave)
      component.handleEscapePress({keyCode: 27})

      mockedSave.should.have.been.called
    })
  })

  describe('#handleOverlayClick', function(){
    it("should save the content", function(){
      const mockedSave = sinon.spy()
      sinon.stub(component, 'save', mockedSave)
      component.handleOverlayClick()

      mockedSave.should.have.been.called
    })
  })
})
