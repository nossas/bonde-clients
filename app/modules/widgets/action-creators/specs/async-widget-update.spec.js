import * as t from '../../../../modules/widgets/action-types'

describe.skip('async-widget-update', () => {
  it('should PUT widget using correct URL and dispatch action', () => {
    const dispatch = sandbox.spy()
    const widget = { id: 2, settings: {content: 'text'} }
    const params = { credentials: {}, mobilization_id: 1 }
    WidgetActions.asyncWidgetUpdate(widget, params)(dispatch)
    const request = requests[0]
    expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/widgets/2`)
    expect(request.method).to.equal('PUT')
    expect(request.requestBody).to.equal(JSON.stringify({widget}))
    request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(widget))
    expect(dispatch).to.have.been.calledWith({
      type: t.SUCCESS_WIDGET_UPDATE,
      widget
    })
  })

  describe('SUCCESS_WIDGET_UPDATE', () => {
    it('should return the edited widget', () => {
      const newContent = 'My widget content'
      const initialState = {
        data: [
          {
            id: 1,
            block_id: 1,
            size: 12,
            content: 'col-12',
            kind: 'content',
            settings: { content: 'old content' }
          }
        ]
      }
      const action = {
        type: SUCCESS_WIDGET_UPDATE,
        widget: {
          id: 1,
          settings: { content: newContent }
        }
      }
      const newState = reducer(initialState, action)
      expect(newState.data[0].settings.content).to.equal(newContent)
    })
  })
})
