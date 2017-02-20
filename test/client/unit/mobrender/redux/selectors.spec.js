import { expect } from 'chai'
import { fromJS } from 'immutable'

import { reducer as rootReducer } from '~client/mobrender/redux'
import Selectors from '~client/mobrender/redux/selectors'

const state = fromJS({
  mobilizations: rootReducer
})

describe('~client/mobrender/redux/selectors', () => {

  describe('#getMobilizations', () => {
    const data = [{ id: 1, name: 'Lorem' }, { id: 2, name: 'Ipsum' }]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        list: {
          isLoaded: true,
          currentId: data[1].id,
          data
        }
      }
    })).toJS()

    it('should get current mobilization', () => {
      expect(Selectors(nextState).getMobilization()).to.deep.equal(data[1])
    })
  })

  describe('#renderIsLoading', () => {
    
    it('should return false when loaded widgets and block', () => { 
      const getState = () => state.mergeDeep(fromJS({
        mobilizations: {
          widgets: { isLoaded: true, fetching: false },
          blocks: { isLoaded: true, fetching: false }
        }
      })).toJS()
      expect(Selectors(getState()).renderIsLoading()).to.equal(false)
    })
    
    it('should return true when fetching widgets or block', () => { 
      let getState = () => state.mergeDeep(fromJS({
        mobilizations: {
          widgets: { isLoaded: true, fetching: true },
          blocks: { isLoaded: true, fetching: false }
        }
      })).toJS()
      expect(Selectors(getState()).renderIsLoading()).to.equal(true)

      getState = () => state.mergeDeep(fromJS({
        mobilizations: {
          widgets: { isLoaded: true, fetching: false },
          blocks: { isLoaded: true, fetching: true }
        }
      })).toJS()
      expect(Selectors(getState()).renderIsLoading()).to.equal(true)
    })
  })

  describe('#hasMouseOver', () => {
    const widget = { id: 1, kind: 'draft' }
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        hover: {
          'widget': widget.id
       }
      }
    })).toJS()

    it('should be true if (key, id) equals mouseOver in state', () => {
      const selectors = Selectors(nextState)
      expect(selectors.hasMouseOver('widget', widget.id)).to.equal(true)
    })

    it('should be false if (key, id) not equals mouseOver or not exists in state', () => {
      const selectors = Selectors(nextState)
      expect(selectors.hasMouseOver('widget', 999)).to.equal(false)
    })
  })

  describe('move block', () => {
    const data = [
      { id: 1, name: 'Lorem' },
      { id: 2, name: 'Ipsum' },
      { id: 3, name: 'Dolor' }
    ]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        blocks: {
          isLoaded: true,
          data
        }
      }
    })).toJS()

    describe('#canMoveUp', () => {

      it('should be true if props.block isnt first of data', () => {
        const selectors = Selectors(nextState, { block: data[1] })
        expect(selectors.canMoveUp()).to.equal(true)
      })

      it('should be false if props.block is first of data', () => {
        const selectors = Selectors(nextState, { block: data[0] })
        expect(selectors.canMoveUp()).to.equal(false)
      })
    })
    
    describe('#canMoveDown', () => {

      it('should be true if props.block isnt last of data', () => {
        const selectors = Selectors(nextState, { block: data[1] })
        expect(selectors.canMoveDown()).to.equal(true)
      })

      it('should be false if props.block is last of data', () => {
        const selectors = Selectors(nextState, { block: data[2] })
        expect(selectors.canMoveDown()).to.equal(false)
      })
    })
  })

  describe('#getBlocks', () => {
    const data = [{ id: 1, name: 'Lorem' }]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        blocks: {
          isLoaded: true,
          data
        }
      }
    })).toJS()

    it('should return blocks loaded', () => {
      const selectors = Selectors(nextState)
      expect(selectors.getBlocks()).to.deep.equal(data)
    })
  })

  describe('#getUploadProgress(key)', () => {
    
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        uploader: {
          bgBlock: 50
        }
      }
    })).toJS()

    const selectors = Selectors(nextState)
    
    it('should return undefined when not exists key to upload', () => {
      expect(selectors.getUploadProgress('header')).to.equal(undefined)
    })

    it('should return progress when exists key to upload', () => {
      expect(selectors.getUploadProgress('bgBlock')).to.equal(50)
    })
  })

  describe('about block edition', () => {
    const getSelector = merge => Selectors(state.mergeDeep(fromJS({
      mobilizations: { ...merge }
    })).toJS())


    it('#getEditing', () => {
      const s = getSelector({ edition: { isEditing: true, mode: 'background' } })
      expect(s.getEditing()).to.equal('background')
    }) 

    it('#getBlockSaving', () => { 
      let s = getSelector({ blocks: { saving: true } })
      expect(s.getBlockSaving()).to.equal(true)
      
      s = getSelector({ blocks: { saving: false } })
      expect(s.getBlockSaving()).to.equal(false)

    })
  })

  it('#getWidgets', () => {
    const widgets = [
      { id: 1, kind: 'draft' },
      { id: 2, kind: 'draft' }
    ]
    const getState = () => state.mergeDeep(fromJS({
      mobilizations: {
        widgets: { data: widgets }
      }
    })).toJS()

    const selector = Selectors(getState())
    expect(selector.getWidgets()).to.deep.equal(widgets)
  })
})
