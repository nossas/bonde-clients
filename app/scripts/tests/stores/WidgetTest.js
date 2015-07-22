import widgets from './../../stores/widgets'
import { EDIT_WIDGET } from './../../constants/ActionTypes';

describe('widgets', () => {
  describe('EDIT_WIDGET', () => {
    it("should return the edited widget", () => {
      const newContent = "My widget content"
      const initialState = [
        {
          id: 1,
          block_id: 1,
          size: 12,
          content: "col-12",
          kind: "content"
        }
      ]
      const action = {
        type: EDIT_WIDGET,
        id: 1,
        content: newContent
      }

      var newState;
      newState = widgets(initialState, action)

      expect(newState[0].content).to.be.equal(newContent)
    })
  })
})
