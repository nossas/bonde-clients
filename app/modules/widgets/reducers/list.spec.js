import { expect } from 'chai'

import * as t from '../../../modules/widgets/action-types'
import reducer from '../../../modules/widgets/reducers/list'
import { createAction } from '../../../modules/widgets/action-creators/create-action'
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
