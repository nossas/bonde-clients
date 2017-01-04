import { expect } from 'chai'

import * as t from '../action-types'
import reducer from '../reducers'

const initialState = {
  isLoaded: false,
  loading: false,
  data: [],
  currentId: undefined,
  menuActiveIndex: undefined
}

describe('MobilizationReducers / entities', () => {

  let payload
  let nextState

  describe('t.ADD', () => {

    beforeEach(() => {
      payload = { id: 1, name: 'Lorem', goal: 'Dolor sit' }
      nextState = reducer(undefined, { type: t.ADD, payload })
    })

    it('should insert payload in data list', () => {
      expect(nextState.data).to.deep.equal([...initialState.data, payload])
    })

    it('should set current mobilization', () => {
      expect(nextState.currentId).to.equal(payload.id)
    })
  })

  describe('t.FETCH', () => {

    beforeEach(() => {
      nextState = reducer(undefined, { type: t.FETCH })
    })

    it('should change loading to true', () => {
      expect(nextState.loading).to.equal(true)
    })

    it('should reset data and current mobilization', () => {
      expect(nextState.data).to.deep.equal([])
      expect(nextState.currentId).to.equal(undefined)
    })
  })

  describe('t.LOAD', () => {

    beforeEach(() => {
      payload = [
        { id: 1, name: 'Lorem', goal: 'Dolor caem' },
        { id: 2, name: 'Sit', goal: 'Spsum inte' },
      ]
      nextState = reducer(undefined, { type: t.LOAD, payload })
    })

    it('should load payload in data', () => {
      expect(nextState.data).to.deep.equal(payload)
    })

    it('should finish fetching', () => {
      expect(nextState.loading).to.equal(false)
      expect(nextState.isLoaded).to.equal(true)
    })
  })

  describe('t.SELECT', () => {

    beforeEach(() => {
      payload = 1
      nextState = reducer(undefined, { type: t.SELECT, payload })
    })

    it('should set current mobilization', () => {
      expect(nextState.currentId).to.equal(payload)
    })
  })

  describe('t.UNSELECT', () => {

    beforeEach(() => {
      nextState = reducer(undefined, { type: t.UNSELECT })
    })

    it('should remove current mobilization', () => {
      expect(nextState.currentId).to.equal(undefined)
    })
  })

  describe('t.TOGGLE_MENU', () => {

    beforeEach(() => {
      payload = 1
      nextState = reducer(undefined, { type: t.TOGGLE_MENU, payload })
    })

    it('should menuActiveIndex to open menu', () => {
      expect(nextState.menuActiveIndex).to.equal(payload)
    })

    it('should remove menuActiveIndex when equals previous index', () => {
      nextState = reducer(nextState, { type: t.TOGGLE_MENU, payload })
      expect(nextState.menuActiveIndex).to.equal(undefined)
    })
  })
})
