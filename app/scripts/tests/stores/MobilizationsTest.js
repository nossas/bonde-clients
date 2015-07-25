import mobilizations from './../../stores/mobilizations'
import { FETCH_MOBILIZATIONS } from './../../constants/ActionTypes';

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
})
