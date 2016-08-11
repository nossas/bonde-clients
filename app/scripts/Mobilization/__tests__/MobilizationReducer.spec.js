import { fromJS } from 'immutable'
import { expect } from 'chai'

import {
  SUCCESS_FETCH_MOBILIZATIONS,
  SUCCESS_ADD_MOBILIZATION,
  SUCCESS_EDIT_MOBILIZATION
} from '../MobilizationActions'

import reducer from '../MobilizationReducer'


describe('MobilizationReducer', () => {

  describe('#list', () => {
    it('should load mobilizations in data', () => {
      const action = {
        type: SUCCESS_FETCH_MOBILIZATIONS,
        result: [
          { id: 1 }
        ]
      }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({
        loading: false,
        loaded: true,
        saving: false,
        data: [
          { id: 1 }
        ]
      })
    })
  })

  describe('#add', () => {
    it('should add mobilization in data', () => {
      const action = {
        type: SUCCESS_ADD_MOBILIZATION,
        result: { id: 1 }
      }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({
        loading: false,
        loaded: false,
        saving: false,
        data: [ { id: 1 } ]
      })
    })
  })

  describe('#edit', () => {
    it('should edit mobilization ind data', () => {
      const initialState = {
        loading: false,
        loaded: true,
        saving: true,
        data: [ { id: 1 } ]
      }
      const action = {
        type: SUCCESS_EDIT_MOBILIZATION,
        result: { id: 1, name: 'Lorem' }
      }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        loading: false,
        loaded: true,
        saving: false,
        data: [ { id: 1, name: 'Lorem' } ]
      })
    })
  })
})
