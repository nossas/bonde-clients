import { createNamedWrapperReducer } from './createReducer'

describe('createReducer', () => {
  describe('createNamedWrapperReducer', () => {
    it('should execute reducer when you are initializing', () => {
      const initialState = { id: 1 }
      const reducerFunction = (state = initialState, action) => [state, action]
      const reducerName = 'mobilizations'
      const reducer = createNamedWrapperReducer(
        reducerFunction,
        reducerName
      )

      const action = {
        type: '@redux/INITIALIZE',
        payload: 'X'
      }
      // when state passed to reducer is undefined it is being initialized
      expect(reducer(undefined, action)).to.deep.equal([initialState, action])
    })

    it('should return state when action.name dismatch reducerName', () => {
      const reducerFunction = (state, action) => [state, action]
      const reducerName = 'mobilizations'

      const reducer = createNamedWrapperReducer(
        reducerFunction,
        reducerName
      )
      const action = { type: '@app/ACTION_TYPE', payload: 'x' }
      const state = { data: [] }
      expect(reducer(state, action)).to.deep.equal(state)
    })

    it('should execute a reducerFunction when action.name is equal to reducerName', () => {
      const reducerFunction = (state, action) => [state, action]
      const reducerName = 'mobilizations'

      const reducer = createNamedWrapperReducer(
        reducerFunction,
        reducerName
      )
      const action = {
        type: '@app/ACTION_TYPE',
        name: reducerName,
        payload: 'x'
      }
      const state = { data: [] }
      expect(reducer(state, action)).to.deep.equal([state, action])
    })
  })
})
