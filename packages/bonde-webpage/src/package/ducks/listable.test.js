import reducer, {
  Types,
  load,
  create,
  update,
  remove,
  select
} from './listable'

describe('ducks/listable', () => {
  
  describe('reducer', () => {
    const initialState = {
      data: [],
      selected: undefined
    }
    
    it('initialize reducer with initialState', () => {
      const nextState = reducer(undefined, {})
      expect(nextState).to.deep.equal(initialState)
    })

    it('change data when Types.LOAD', () => {
      const payload = [{ id: 1, name: 'Minha Beaga' }]
      const action = { type: Types.LOAD, payload }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({...initialState,
        data: payload
      })
    })

    it('add entry in data when Types.CREATE', () => {
      const payload = { id: 1, name: 'Minha Beaga' }
      const action = { type: Types.CREATE, payload }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({...initialState,
        data: [payload]
      })
    })

    it('keep state if same entry id exists in data when Types.CREATE', () => {
      const payload = { id: 1, name: 'Minha Beaga' }
      const action = { type: Types.CREATE, payload }
      const stateWithEntry = reducer(undefined, action)
      const nextState = reducer(stateWithEntry, action)
      expect(nextState).to.deep.equal(stateWithEntry)
    })

    it('update entry in data when Types.UPDATE', () => {
      const payload = { id: 1, name: 'Minha Beaga' }
      let action = { type: Types.CREATE, payload }
      // first add a new entry
      const stateWithEntry = reducer(undefined, action)
      // seconde change a entry added
      action = {
        type: Types.UPDATE,
        payload: {...payload, name: 'Minha beaga' }
      }
      const nextState = reducer(stateWithEntry, action)
      expect(nextState).to.deep.equal({
        ...stateWithEntry,
        data: [{ ...payload, name: 'Minha beaga' }]
      })
    })

    it('keep state if not exists the same entry id in data when Types.UPDATE', () => {
      const payload = { id: 1, name: 'Minha Beaga' }
      let action = { type: Types.CREATE, payload }
      // first add a new entry
      const stateWithEntry = reducer(undefined, action)
      // seconde change a entry added
      action = {
        type: Types.UPDATE,
        payload: { id: 2, name: 'Minha beaga' }
      }
      const nextState = reducer(stateWithEntry, action)
      expect(nextState).to.deep.equal({
        ...stateWithEntry,
        data: [payload]
      })

    })

    it('remove entry in data when Types.REMOVE', () => {
      const payload = { id: 1, name: 'Minha Beaga' }
      let action = { type: Types.CREATE, payload }
      // first add a new entry
      const stateWithEntry = reducer(undefined, action)
      // seconde change a entry added
      action = { type: Types.REMOVE, payload }
      const nextState = reducer(stateWithEntry, action)
      expect(nextState).to.deep.equal(initialState)
    })

    it('keep state if not exists the same entry id in data when Types.REMOVE', () => {
      const payload = { id: 1, name: 'Minha Beaga' }
      let action = { type: Types.CREATE, payload }
      // first add a new entry
      const stateWithEntry = reducer(undefined, action)
      // seconde change a entry added
      action = { type: Types.REMOVE, payload: { id: 2 } }
      const nextState = reducer(stateWithEntry, action)
      expect(nextState).to.deep.equal(stateWithEntry)
    })

    it('add identifier selected in state when Types.SELECT', () => {
      const payload = 1
      const action = { type: Types.SELECT, payload }
      const nextState = reducer(undefined, action)
      expect(nextState).to.deep.equal({...initialState,
        selected: payload
      })
    })
  })

  describe('actions', () => {
    const entry = { id: 1, name: 'Minha Beaga' }

    it('load', () => {
      const entries = [entry]
      expect(load(entries)).to.deep.equal({
        type: Types.LOAD,
        payload: entries
      })
    })

    it('create', () => {
      expect(create(entry)).to.deep.equal({
        type: Types.CREATE,
        payload: entry
      })
    })

    it('update', () => {
      expect(update(entry)).to.deep.equal({
        type: Types.UPDATE,
        payload: entry
      })
    })

    it('remove', () => {
      expect(remove(entry)).to.deep.equal({
        type: Types.REMOVE,
        payload: entry
      })
    })

    it('select', () => {
      expect(select(1)).to.deep.equal({
        type: Types.SELECT,
        payload: 1
      })
    })

  })
})
