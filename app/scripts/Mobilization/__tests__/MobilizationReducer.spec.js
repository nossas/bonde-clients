import { fromJS } from 'immutable'
import { expect } from 'chai'

import {
  SUCCESS_FETCH_MOBILIZATIONS,
  SUCCESS_ADD_MOBILIZATION,
  SUCCESS_EDIT_MOBILIZATION,

  PROGRESS_UPLOAD_FACEBOOK_IMAGE,
  FINISH_UPLOAD_FACEBOOK_IMAGE
} from '../MobilizationActions'

import reducer, { initialState } from '../MobilizationReducer'

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
        mobilization: { id: 1 }
      }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({
        loading: false,
        loaded: false,
        data: [ { id: 1 } ]
      })
    })
  })

  describe('#edit', () => {
    it('should edit mobilization ind data', () => {
      const previousState = {
        loading: false,
        loaded: true,
        data: [ { id: 1 } ]
      }
      const action = {
        type: SUCCESS_EDIT_MOBILIZATION,
        mobilization: { id: 1, name: 'Lorem' }
      }
      const nextState = reducer(previousState, action)
      expect(nextState).to.deep.equal({
        loading: false,
        loaded: true,
        data: [ { id: 1, name: 'Lorem' } ]
      })
    })
  })

  describe('#sharing', () => {
    describe('PROGRESS_UPLOAD_FACEBOOK_IMAGE', () => {
      it('should change state and set isFacebookShareImageUploading to true with initial state',
        () => {
          const action = { type: PROGRESS_UPLOAD_FACEBOOK_IMAGE }
          const nextState = reducer(undefined, action)
          const expectedState = { ...initialState, isFacebookShareImageUploading: true }
          expect(nextState).to.deep.equal(expectedState)
        }
      )
      it('should change state and set isFacebookShareImageUploading to true with previous state',
        () => {
          const previousState = {
            loading: false,
            loaded: true,
            data: [ { id: 1 } ]
          }
          const action = { type: PROGRESS_UPLOAD_FACEBOOK_IMAGE }
          const nextState = reducer(previousState, action)
          const expectedState = { ...previousState, isFacebookShareImageUploading: true }
          expect(nextState).to.deep.equal(expectedState)
        }
      )
    })
    describe('FINISH_UPLOAD_FACEBOOK_IMAGE', () => {
      it('should change state and set isFacebookShareImageUploading to false with initial state',
        () => {
          const action = { type: FINISH_UPLOAD_FACEBOOK_IMAGE }
          const nextState = reducer(undefined, action)
          const expectedState = { ...initialState, isFacebookShareImageUploading: false }
          expect(nextState).to.deep.equal(expectedState)
        }
      )
      it('should change state and set isFacebookShareImageUploading to false with previous state',
        () => {
          const previousState = {
            loading: false,
            loaded: true,
            data: [ { id: 1 } ]
          }
          const action = { type: FINISH_UPLOAD_FACEBOOK_IMAGE }
          const nextState = reducer(previousState, action)
          const expectedState = { ...previousState, isFacebookShareImageUploading: false }
          expect(nextState).to.deep.equal(expectedState)
        }
      )
    })
  })
})
