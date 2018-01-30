import reducer, { Types } from './rootReducer'

describe('package/reducer', () => {
  
  let initialState
  beforeEach(() => {
    initialState = { meta: undefined, blocks: [], widgets: [] }
  })

  it('should load meta, blocks and widgets when SELECT_PAGE', () => { 
    const meta = { name: 'Minha Beagá', goal: 'Lorem ipsum dolor' }
    const blocks = [
      { id: 1, name: 'Inicio' },
      { id: 2, name: 'Fale Conosco' }
    ]
    const widgets = [
      { id: 1, kind: 'content', block_id: 1 },
      { id: 2, kind: 'form', block_id: 2 },
      { id: 3, kind: 'content', block_id: 2 }
    ]
    const action = { type: Types.SELECT_PAGE, payload: { meta, blocks, widgets } }
    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      meta,
      blocks,
      widgets
    })
  })
})
