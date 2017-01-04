import { expect } from 'chai'

import * as t from '../../../modules/widgets/action-types'
import * as matchActionTypes from '../../../modules/widgets/__plugins__/match/action-types'
import { createAction } from '../../../modules/widgets/action-creators/create-action'
import reducer from '../../../modules/widgets/reducers/list'
import { SUCCESS_FILL_WIDGET } from '../../../scripts/Widget/actions'

describe('app/modules/widgets/reducers/list', () => {

  describe('Fill Widget', () => {
    it('should add count in success fill widget', () => {
      // state while requesting
      const initialState = {
        data: [{ id: 1, settings: {} }],
        saving: true
      }
      const action = { type: SUCCESS_FILL_WIDGET, counter: { id: 1, count: 2 } }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        data: [{ id: 1, settings: {}, count: 2, filled: true }],
        saving: false
      })
    })
  })

  context('kind equals match', () => {
    let initialState

    beforeEach(() => {
      // init global state all the tests
      initialState = {
        data: [{ id: 1, kind: 'match', match_list: [] }]
      }
    })

    it('should add match saved in match_list', () => {
      const action = createAction(matchActionTypes.WIDGET_MATCH_CREATE_SUCCESS, { widget_id: 1 })
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        data: [{ id: 1, kind: 'match', match_list: [{ widget_id: 1 }] }]
      })
    })

    it('should update match saved in match_list', () => {
      initialState.data[0].match_list.push(
        { id: 1, goal_image: 'test.png' }
      )
      const action = createAction(
        matchActionTypes.WIDGET_MATCH_UPDATE_SUCCESS,
        { widget_id: 1, id: 1, goal_image: 'changed.png' }
      )
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        data: [{
          id: 1,
          kind: 'match',
          match_list: [
            { widget_id: 1, id: 1, goal_image: 'changed.png' }
          ]
        }]
      })
    })

    it('should remove match when delete choice', () => {
      initialState = {
        data: [{
          id: 1,
          kind: 'match',
          match_list: [
            { id: 1, first_choice: "framboesa", second_choice: "lula", goal_image: 'test.png' },
            { id: 2, first_choice: "framboesa", second_choice: "tatu", goal_image: 'test.png' },
            { id: 3, first_choice: "gota", second_choice: "tatu", goal_image: 'test.png' },
          ]
        }]
      }
      const action = createAction(
        matchActionTypes.WIDGET_MATCH_DESTROY_SUCCESS,
        { widget_id: 1, deleted_matches: [2, 3] }
      )
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        data: [{
          id: 1,
          kind: 'match',
          match_list: [
            { id: 1, first_choice: "framboesa", second_choice: "lula", goal_image: 'test.png' }
          ]
        }]
      })
    })

    it('should update state widget.exported_at when download report', () => {
      const initialState = {
        data: [{ id: 1, kind: 'form_entry' }]
      }
      const action = createAction(t.EXPORT_DATACLIP_SUCCESS, { widget: { id: 1 } })
      const nextState = reducer(initialState, action)
      expect(nextState).to.have.deep.property('data[0].exported_at')
    })

    it('widget.exported_at state property should be Date type', () => {
      const initialState = {
        data: [{ id: 1, kind: 'form_entry' }]
      }
      const action = createAction(t.EXPORT_DATACLIP_SUCCESS, { widget: { id: 1 } })
      const nextState = reducer(initialState, action)
      expect(nextState.data[0].exported_at).to.be.Date
    })
  })

})
