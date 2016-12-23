describe.skip('async-widget-fetch', () => {
  it('should GET widgets using correct URL and dispatch action', () => {
    const dispatch = sandbox.spy()
    WidgetActions.asyncWidgetFetch({mobilization_id: 1})(dispatch)
    const request = requests[0]
    const widgets = [{id: 1}, {id: 2}]
    expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/widgets`)
    expect(request.method).to.equal('GET')
    request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(widgets))
    expect(dispatch).to.have.been.calledWith({
      type: FETCH_WIDGETS,
      widgets
    })
  })
})
