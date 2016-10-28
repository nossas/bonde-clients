export const REQUEST_TEMPLATE_CREATE = 'REQUEST_TEMPLATE_CREATE'
export const SUCCESS_TEMPLATE_CREATE = 'SUCCESS_TEMPLATE_CREATE'
export const FAILURE_TEMPLATE_CREATE = 'FAILURE_TEMPLATE_CREATE'

const createTemplateRequest = () => ({ type: REQUEST_TEMPLATE_CREATE })
const createTemplateSuccess = template => ({ type: SUCCESS_TEMPLATE_CREATE, template })
const createTemplateFailure = error => ({ type: FAILURE_TEMPLATE_CREATE, error })
export const createTemplateAsync = (template, next) =>
  (dispatch, getState, request) => {
    const { auth: { credentials } } = getState()
    const { mobilization, ...rest } = template
    const body = { ...rest, mobilization_id: mobilization.id }

    dispatch(createTemplateRequest())
    return request.createTemplate(body, credentials)
      .then(response => {
        dispatch(createTemplateSuccess(response.data))
        next && typeof next === 'function' && next()
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(createTemplateFailure(error))
        return Promise.reject({ _error: `Response ${error}` })
      })
}
