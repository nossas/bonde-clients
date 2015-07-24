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

    context("when the editor has changed", function(){
      before(function(){
        sinon.stub(component, "hasChanged").returns(true)
      })

      it("should save the widget when confirm returns true", function(){
        sinon.stub(window, 'confirm').returns(true)
        const mockedSave = sinon.spy()
        sinon.stub(component, 'save', mockedSave)
        component.handleOverlayClick()

        mockedSave.should.have.been.called
        window.confirm.restore()
      })

      it("should reset the editor's value when confirm returns false", function(){
        sinon.stub(window, 'confirm').returns(false)
        const mockedSetValue = sinon.spy()
        sinon.stub(component.state.editor, 'setValue', mockedSetValue)
        component.handleOverlayClick()

        mockedSetValue.should.have.been.called
        window.confirm.restore()
      })
    })
  })
})
