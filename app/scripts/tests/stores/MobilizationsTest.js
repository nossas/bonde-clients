import mobilizations from './../../stores/mobilizations'
import { EDIT_COLUMN_CONTENT } from './../../constants/ActionTypes';

describe('mobilizations', function(){
  describe('#editColumnContent', function(){
    it('should change the column text', function(){
      const mobilizationsList = [
        {
          name: "Bicicletada contra a redução da maioridade penal",
          id: 1,
          pages: [{
            blocks: [{
              uuid: "ffxx1122A2",
              columns: [{
                hash: "xyz1",
                size: 12,
                type: "content",
                content: "col-12"
              }]
            }]
          }]
        }
      ]

      const text = "My text"
      const action = {
        text: text,
        type: EDIT_COLUMN_CONTENT,
        mobilizationId: 1,
        blockId: "ffxx1122A2",
        columnHash: "xyz1"
      }

      var newState;

      newState = mobilizations(mobilizationsList, action)

      expect(newState[0].pages[0].blocks[0].columns[0].content).to.be.equal(text)
    })
  })
})
