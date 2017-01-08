import request from 'superagent'

export const REQUEST_FILL_WIDGET = 'REQUEST_FILL_WIDGET'
export const SUCCESS_FILL_WIDGET = 'SUCCESS_FILL_WIDGET'
export const FAILURE_FILL_WIDGET = 'FAILURE_FILL_WIDGET'

export const REQUEST_FETCH_GOOGLE_FONTS = 'REQUEST_FETCH_GOOGLE_FONTS'
export const SUCCESS_FETCH_GOOGLE_FONTS = 'SUCCESS_FETCH_GOOGLE_FONTS'
export const FAILURE_FETCH_GOOGLE_FONTS = 'FAILURE_FETCH_GOOGLE_FONTS'

export const TOOLBAR_SET_LINK_OPEN_STRATEGY = 'TOOLBAR_SET_LINK_OPEN_STRATEGY'

const fillWidgetRequest = () => ({ type: REQUEST_FILL_WIDGET })
const fillWidgetFailure = error => ({ type: FAILURE_FILL_WIDGET, error })
const fillWidgetSuccess = data => ({
  // For endpoint reference, see: https://github.com/ourcities/hub-api/issues/39
  type: SUCCESS_FILL_WIDGET,
  counter: { id: data.widget_id, count: data.count }
})

export const fillWidget = (widgetId, fill) => dispatch => {
  dispatch(fillWidgetRequest())
  request
    .post(`${process.env.API_URL}/widgets/${widgetId}/fill`)
    .send({ fill })
    .end((err, res) => {
      if (err || !res.ok) dispatch(fillWidgetFailure(err || res.body))
      else dispatch(fillWidgetSuccess(res.body))
    })
}

const fetchGoogleFontsRequest = () => ({ type: REQUEST_FETCH_GOOGLE_FONTS })
const fetchGoogleFontsSuccess = fonts => ({ type: SUCCESS_FETCH_GOOGLE_FONTS, fonts })
const fetchGoogleFontsFailure = error => ({ type: FAILURE_FETCH_GOOGLE_FONTS, error })
export const fetchGoogleFonts = () => dispatch => {
  dispatch(fetchGoogleFontsRequest())
  request
    .get('https://www.googleapis.com/webfonts/v1/webfonts')
    .query({ key: process.env.GOOGLE_FONTS_API_KEY })
    .end((err, res) => {
      if (err || !res.ok) dispatch(fetchGoogleFontsFailure(err || res.body))
      else dispatch(fetchGoogleFontsSuccess(res.body))
    })
}

export const setToolbarLinkOpenStrategy = strategy =>
  ({ type: TOOLBAR_SET_LINK_OPEN_STRATEGY, strategy })
