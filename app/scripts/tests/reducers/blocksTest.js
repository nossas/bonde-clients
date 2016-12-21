import blocks from './../../reducers/blocks'
import { constants as c } from '../../../modules/mobilizations/blocks'

let initialState

describe.skip('blocks', () => {
  before(() => {
    initialState = {
      data: [
        { id: 1, bg_color: 'bg-1' },
        { id: 2, bg_color: 'bg-2' },
        { id: 3, bg_color: 'bg-3' }
      ]
    }
  })

  describe('FETCH_BLOCKS', () => {
    it('should return the mobilizations', () => {
      const action = {
        type: c.FETCH_BLOCKS,
        blocks: [{id: 1}, {id: 2}]
      }
      const newState = blocks(initialState, action)
      expect(newState).to.eql(action.blocks)
    })
  })

  describe('EDIT_BLOCK', () => {
    it('should return the mobilizations with edited block', () => {
      const action = {
        type: c.EDIT_BLOCK,
        block: {id: 1, bg_color: 'bg-foo'}
      }
      const newState = blocks(initialState, action)
      expect(newState.data).to.eql([
        { id: 1, bg_color: 'bg-foo' },
        { id: 2, bg_color: 'bg-2' },
        { id: 3, bg_color: 'bg-3' }
      ])
    })
  })

  describe('MOVE_BLOCK_UP', () => {
    it('should return the mobilizations with new order', () => {
      const action = {
        type: c.MOVE_BLOCK_UP,
        block: {id: 2, bg_color: 'bg-2'}
      }
      const newState = blocks(initialState, action)
      expect(newState.data).to.eql([
        { id: 2, bg_color: 'bg-2' },
        { id: 1, bg_color: 'bg-1' },
        { id: 3, bg_color: 'bg-3' }
      ])
    })
  })

  describe('MOVE_BLOCK_DOWN', () => {
    it('should return the mobilizations with new order', () => {
      const action = {
        type: c.MOVE_BLOCK_DOWN,
        block: {id: 2, bg_color: 'bg-2'}
      }
      const newState = blocks(initialState, action)
      expect(newState.data).to.eql([
        { id: 1, bg_color: 'bg-1' },
        { id: 3, bg_color: 'bg-3' },
        { id: 2, bg_color: 'bg-2' }
      ])
    })
  })

  describe('REMOVE_BLOCK', () => {
    it('should return the mobilizations without removed block', () => {
      const action = {
        type: c.REMOVE_BLOCK,
        block: {id: 2}
      }
      const newState = blocks(initialState, action)
      expect(newState.data).to.eql([
        { id: 1, bg_color: 'bg-1' },
        { id: 3, bg_color: 'bg-3' }
      ])
    })
  })
})
