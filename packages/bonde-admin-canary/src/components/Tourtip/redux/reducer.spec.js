import * as actionTypes from './actionTypes'
import reducer from './reducer'

test('NEXT_STEP in last STEP should reset tour', t => {
  const initialState = {
    total: 2,
    currentStep: 2,
    show: true
  }
  const action = { type: actionTypes.NEXT_STEP }
  const nextState = reducer(initialState, action)
  t.equal(nextState.currentStep, 1)
})
