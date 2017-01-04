import { expect } from 'chai'

import * as t from './action-types'
import { createAction } from './action-creators/create-action'
import reducers from './reducers'


describe('app/modules/widgets/__plugins__/match/reducers.js', () => {
  let initialState

  beforeEach(() => {
    // init global state all the tests
    initialState = {
      data: [{ id: 1, kind: 'match', match_list: [] }]
    }
  })

  it('should add match saved in match_list', () => {
    const action = createAction(t.WIDGET_MATCH_CREATE_SUCCESS, { widget_id: 1 })
    const nextState = reducers(initialState, action)
    expect(nextState).to.deep.equal({
      data: [{ id: 1, kind: 'match', match_list: [{ widget_id: 1 }] }]
    })
  })

  it('should update match saved in match_list', () => {
    initialState.data[0].match_list.push(
      { id: 1, goal_image: 'test.png' }
    )
    const action = createAction(
      t.WIDGET_MATCH_UPDATE_SUCCESS,
      { widget_id: 1, id: 1, goal_image: 'changed.png' }
    )
    const nextState = reducers(initialState, action)
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
      t.WIDGET_MATCH_DESTROY_SUCCESS,
      { widget_id: 1, deleted_matches: [2, 3] }
    )
    const nextState = reducers(initialState, action)
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
})
