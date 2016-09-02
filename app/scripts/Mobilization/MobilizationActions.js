import request from 'superagent'

// Constants

export const REQUEST_FETCH_MOBILIZATIONS = 'REQUEST_FETCH_MOBILIZATIONS'
export const SUCCESS_FETCH_MOBILIZATIONS = 'SUCCESS_FETCH_MOBILIZATIONS'
export const FAILURE_FETCH_MOBILIZATIONS = 'FAILURE_FETCH_MOBILIZATIONS'

export const SET_CURRENT_MOBILIZATION = 'SET_CURRENT_MOBILIZATION'
export const SUCCESS_ADD_MOBILIZATION = 'SUCCESS_ADD_MOBILIZATION'
export const SUCCESS_EDIT_MOBILIZATION = 'SUCCESS_EDIT_MOBILIZATION'

export const PROGRESS_UPLOAD_FACEBOOK_IMAGE = 'PROGRESS_UPLOAD_FACEBOOK_IMAGE'
export const FINISH_UPLOAD_FACEBOOK_IMAGE = 'FINISH_UPLOAD_FACEBOOK_IMAGE'

// Actions
// TODO: Buscar uma maneira mais clara de fazer isso

export const fetchMobilizations = (queryFilter = {}) => ({
  types: [
    REQUEST_FETCH_MOBILIZATIONS,
    SUCCESS_FETCH_MOBILIZATIONS,
    FAILURE_FETCH_MOBILIZATIONS
  ],
  promise: () => new Promise((resolve, reject) => {
    request
      .get(`${process.env.API_URL}/mobilizations`)
      .send(queryFilter)
      .end((err, res) => {
        if (err || !res.ok) reject(err || res.body)
        else resolve(res.body)
      })
  })
})

const addMobilizationSuccess = mobilization => ({ type: SUCCESS_ADD_MOBILIZATION, mobilization })
export const addMobilization = (mobilization, next = null) => (dispatch, getState, request) =>
  dispatch => request.addMobilization(mobilization, getState().auth.credentials)
    .then(response => {
        const { data: newMobilization } = response
        dispatch(addMobilizationSuccess(newMobilization))
        // TODO: Update react-router and install react-router-redux to make only a push in history.
        // See: https://github.com/reactjs/react-router-redux#pushlocation-replacelocation-gonumber-goback-goforward
        next && typeof next === 'function' && next(newMobilization)
    })
    .catch(error => Promise.reject({ _error: `Response ${error}` }))

export const setCurrentMobilizationId = currentId => ({
  type: SET_CURRENT_MOBILIZATION,
  currentId: parseInt(currentId, 10)
})

const editMobilizationSuccess = mobilization => ({ type: SUCCESS_EDIT_MOBILIZATION, mobilization })
export const editMobilization = (mobilization, next = null) => (dispatch, getState, request) =>
  dispatch => request.editMobilization(mobilization, getState().auth.credentials)
    .then(response => {
      const { data: updatedMobilization } = response
      dispatch(editMobilizationSuccess(updatedMobilization))
      next && typeof next === 'function' && next(updatedMobilization)
    })
    .catch(error => Promise.reject({ _error: `Response ${error}` }))

export const mobilizationsIsLoaded = state => state.mobilization.loaded
export const progressUploadFacebookImage = () => ({ type: PROGRESS_UPLOAD_FACEBOOK_IMAGE })
export const finishUploadFacebookImage = () => ({ type: FINISH_UPLOAD_FACEBOOK_IMAGE })
