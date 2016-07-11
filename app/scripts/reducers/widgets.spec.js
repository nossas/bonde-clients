import { expect } from 'chai'

import { ADD_MATCH } from '../constants/ActionTypes'
import reducer from './widgets'


describe('widgets reducers', () => {

  context('kind equals match', () => {
    let initialState

    beforeEach(() => {
      // init global state all the tests
      initialState = {
        data: [{
          id: 1,
          kind: 'match',
          match_list: []
        }]
      }
    })

    it('should add match saved in match_list', () => {
      const action = {
        type: ADD_MATCH,
        match: {widget_id: 1}
      }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        data: [{
          id: 1,
          kind: 'match',
          match_list: [{widget_id: 1}]
        }]
      })
    })
  })

})
