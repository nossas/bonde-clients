import { expect } from 'chai'

import { createAction } from './action-creators/create-action'
import { constants as c } from '../../mobilizations/blocks'
import reducers, { initialState } from '../../mobilizations/blocks/reducers'

describe('BlockReducer', () => {

  it('should load blocks in data', () => {
    const action = createAction(c.SUCCESS_ASYNC_BLOCK_FETCH, [{ id: 1 }])
    const nextState = reducers(undefined, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      loaded: true,
      data: [{ id: 1 }]
    })
  })

  describe('START_EDITING_BLOCK', () => {
    it('should return `editionMode` true', () => {
      const action = createAction(c.BLOCK_EDITION_MODE, true)
      const newState = reducers(null, action)
      expect(newState.editionMode).to.be.true
    })
  })

  describe('STOP_EDITING_BLOCK', () => {
    it('should return `editionMode` false', () => {
      const action = createAction(c.BLOCK_EDITION_MODE, false)
      const newState = reducers(null, action)
      expect(newState.editionMode).to.be.false
    })
  })
})
