import { expect } from 'chai'

import { constants as c } from '../../mobilizations/blocks'
import reducers, { initialState } from '../../mobilizations/blocks/reducers'

describe('BlockReducer', () => {

  it('should load blocks in data', () => {
    const action = {
      type: c.SUCCESS_ASYNC_BLOCK_FETCH,
      payload: [{ id: 1 }]
    }
    const nextState = reducers(undefined, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      loaded: true,
      data: [{ id: 1 }]
    })
  })
})
