import { expect } from 'chai'

import {
  REQUEST_FETCH_BLOCKS,
  SUCCESS_FETCH_BLOCKS,
  FAILURE_FETCH_BLOCKS,
} from '../../../modules/mobilizations/blocks/action-types'

import reducer from '../../reducers/blocks'

describe('BlockReducer', () => {

  it('should load blocks in data', () => {
    const action = {
      type: SUCCESS_FETCH_BLOCKS,
      payload: [{ id: 1 }]
    }
    const nextState = reducer(undefined, action)
    expect(nextState).to.deep.equal({
      loaded: true,
      loading: false,
      data: [{ id: 1 }]
    })
  })
})
