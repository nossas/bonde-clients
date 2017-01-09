import request from 'superagent'

export const REQUEST_FETCH_GOOGLE_FONTS = 'REQUEST_FETCH_GOOGLE_FONTS'
export const SUCCESS_FETCH_GOOGLE_FONTS = 'SUCCESS_FETCH_GOOGLE_FONTS'
export const FAILURE_FETCH_GOOGLE_FONTS = 'FAILURE_FETCH_GOOGLE_FONTS'

export const TOOLBAR_SET_LINK_OPEN_STRATEGY = 'TOOLBAR_SET_LINK_OPEN_STRATEGY'

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
