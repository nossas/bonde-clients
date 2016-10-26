
export const SUCCESS_EDIT_WIDGET = 'SUCCESS_EDIT_WIDGET'

const editWidgetSuccess = widget => ({ type: SUCCESS_EDIT_WIDGET, widget })
export const editWidgetAsync = widget => (dispatch, getState, request) => {
  const state = getState()
  const mobilization = getMobilization(state)
  const { auth: { credentials } } = state
  return request.editWidget(widget, mobilization, credentials)
    .then(response => {
      dispatch(editWidgetSuccess(response.data))
      return Promise.resolve()
    })
    .catch(error => Promise.reject({ _error: `Response ${error}` }))
}
