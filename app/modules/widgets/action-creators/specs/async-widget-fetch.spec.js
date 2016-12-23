import { createAction } from '../../../../modules/widgets/action-creators/create-action'
import { actions as WidgetActions } from '../../../../modules/widgets'
import * as t from '../../../../modules/widgets/action-types'

describe.skip('async-widget-fetch', () => {
  it('should GET widgets using correct URL and dispatch action', () => {
    const dispatch = sandbox.spy()
    WidgetActions.asyncWidgetFetch({mobilization_id: 1})(dispatch)
    const request = requests[0]
    const widgets = [{id: 1}, {id: 2}]
    expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/widgets`)
    expect(request.method).to.equal('GET')
    request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(widgets))
    expect(dispatch).to.have.been.calledWith(
      createAction(t.SUCCESS_ASYNC_WIDGET_FETCH, widgets)
    )
  })
})
