import mobilizations from './../../stores/mobilizations'
import { FETCH_MOBILIZATIONS, EDIT_MOBILIZATION } from './../../constants/ActionTypes';

describe('mobilizations', () => {
  describe('FETCH_MOBILIZATIONS', () => {
    it('should return the mobilizations', () => {
      const action = {
        type: FETCH_MOBILIZATIONS,
        mobilizations: [{id: 1}, {id: 2}]
      }
      const newState = mobilizations([], action)
      expect(newState).to.eql(action.mobilizations)
    })
  })

  describe('EDIT_MOBILIZATION', () => {
    it('should return mobilizations with new data', () => {
      const action = {
        type: EDIT_MOBILIZATION,
        mobilization: {id: 1, google_analytics_code: "UA-42446026"}
      }
      const newState = mobilizations([{id: 1, google_analytics_code: null}], action)
      expect(newState).to.deep.include.members([action.mobilization])
    })
  })
})
