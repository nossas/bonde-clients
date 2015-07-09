import * as MobilizationActions from './../../actions/MobilizationActions'
import * as types from './../../constants/ActionTypes'

describe('MobilizationActions', function() {
  let subject

  describe('editColumnContent', function(){
    before(function(){
      subject = MobilizationActions.editColumnContent(1, 2, "x1", "Hello world")
    })

    it('should return type as EDIT_COLUMN_CONTENT', function(){
      expect(subject)
        .to.have.property('type').equal(types.EDIT_COLUMN_CONTENT)
    })

    it('should return mobilizationId', function(){
      expect(subject)
        .to.have.property('mobilizationId').equal(1)
    })

    it('should return blockId', function(){
      expect(subject)
        .to.have.property('blockId').equal(2)
    })

    it('should return columnHash', function(){
      expect(subject)
        .to.have.property('columnHash').equal("x1")
    })

    it('should return text', function(){
      expect(subject)
        .to.have.property('text').equal("Hello world")
    })
  })
})
