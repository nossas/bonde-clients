import { expect } from 'chai'

import { actionTypes as types } from '../../../modules/mobilizations/blocks'
import reducer from '../../reducers/blocks'

describe('BlockReducer', () => {

  it('should load blocks in data', () => {
    const action = {
      type: types.SUCCESS_ASYNC_BLOCK_FETCH,
      payload: [{ id: 1 }]
    }
    const nextState = reducer(undefined, action)
    expect(nextState).to.deep.equal({
      loaded: true,
      data: [{ id: 1 }]
    })
  })
})
