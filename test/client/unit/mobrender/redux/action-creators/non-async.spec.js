import { expect } from 'chai'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as MobActions from '~client/mobrender/redux/action-creators'
import * as t from '~client/mobrender/redux/action-types'
import { createAction } from '~client/mobrender/redux/action-creators/create-action'


describe('client/mobrender/redux/action-creators (non-async)', () => {

  let store

  beforeEach(() => {
    store = configureStore([ thunk ])() 
  })

  describe('doing hover', () => {
  
    it('handleMouseOut', () => {
      const expected = createAction(t.MOUSE_OUT, { key: 'block' })
      store.dispatch(MobActions.handleMouseOut('block'))
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })

    it('handleMouseOver', () => {
      const expected = createAction(t.MOUSE_OVER, { key: 'block', id: 1 })
      store.dispatch(MobActions.handleMouseOver('block', 1))
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })
  })

  describe('doing edition', () => {
    
    it('handleEdit', () => {
      const expected = createAction(t.TURN_ON_EDITION, 'background')
      store.dispatch(MobActions.handleEdit('background'))
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })

    it('handleCancelEdit', () => {
      const expected = createAction(t.TURN_OFF_EDITION)
      store.dispatch(MobActions.handleCancelEdit())
      expect(store.getActions().length).to.equal(1)
      expect(store.getActions()[0]).to.deep.equal(expected)
    })
  })
})
