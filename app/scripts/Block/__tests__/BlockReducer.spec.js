import { expect } from 'chai'

import {
  REQUEST_ASYNC_BLOCK_FETCH,
  SUCCESS_ASYNC_BLOCK_FETCH,
  FAILURE_ASYNC_BLOCK_FETCH,
} from '../../../modules/mobilizations/blocks/action-types'

import reducer from '../../reducers/blocks'

describe('BlockReducer', () => {

  it('should load blocks in data', () => {
    const action = {
      type: SUCCESS_ASYNC_BLOCK_FETCH,
      payload: [{ id: 1 }]
    }
    const nextState = reducer(undefined, action)
    expect(nextState).to.deep.equal({
      loaded: true,
      data: [{ id: 1 }]
    })
  })
})
