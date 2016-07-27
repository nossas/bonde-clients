import { expect } from 'chai'

import { SUCCESS_FETCH_MOBILIZATIONS } from '../MobilizationActions'

import reducer from '../MobilizationReducer'


describe('MobilizationReducer', () => {

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
