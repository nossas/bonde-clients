import { createNamedWrapperAction } from './createAction'

describe('createAction', () => {
  describe('createNamedWrapperAction', () => {
    const action = (payload) => ({ type: '@app/TYPE', payload })

    it('should throw error when actionFunction inst a function', () => {
      expect(createNamedWrapperAction)
        .to.throw(Error, 'actionFunction should be a function')
    })

    it('should return a function that receive payload and return named action', () => {
      const payload = 'payload'
      const namedAction = createNamedWrapperAction(action, 'widgets')
      expect(namedAction(payload))
        .to.deep.equal({
          ...action(payload),
          name: 'widgets'
        })
    })
  })
})
